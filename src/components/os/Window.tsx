'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { useWindow } from './state/window-manager';
import type {
  WindowBounds,
  WindowId,
  WindowSizeMode,
} from './state/types';
import { cn } from '@/lib/cn';
import { CloseIcon, MaximizeIcon, MinimizeIcon } from './icons';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const preferredSizes: Record<Size, { width: number; height: number }> = {
  sm: { width: 440, height: 420 },
  md: { width: 640, height: 540 },
  lg: { width: 820, height: 600 },
  xl: { width: 920, height: 640 },
};

type Props = {
  id: WindowId;
  title: string;
  icon?: ReactNode;
  size?: Size;
  children: ReactNode;
  /** Index into the open-windows stack, used for the first cascade position. */
  stackIndex: number;
};

type DragState = {
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startBounds: WindowBounds;
  snap: WindowSizeMode | null;
};

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

type ResizeState = {
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startBounds: WindowBounds;
  direction: ResizeDirection;
};

const CASCADE_OFFSET = 32;
const VIEWPORT_GUTTER = 8;
const SNAP_EDGE = 28;
const TASKBAR_RESERVE = 80;
const MIN_WINDOW_WIDTH = 320;
const MIN_WINDOW_HEIGHT = 260;

export const Window = forwardRef<HTMLDivElement, Props>(function Window(
  { id, title, icon, size = 'md', children, stackIndex },
  ref,
) {
  const {
    state,
    isFocused,
    close,
    focus,
    minimize,
    setBounds,
    setSizeMode,
  } = useWindow(id);
  const [closing, setClosing] = useState(false);
  const [snapPreview, setSnapPreview] = useState<WindowSizeMode | null>(null);
  const titleId = useId();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const resizeRef = useRef<ResizeState | null>(null);
  const pendingBoundsRef = useRef<WindowBounds | null>(null);
  const rafRef = useRef<number | null>(null);

  const offset = stackIndex * CASCADE_OFFSET;

  useEffect(() => {
    if (!isFocused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        triggerClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && contentRef.current) {
      contentRef.current.focus({ preventScroll: true });
    }
  }, [isFocused, state.openedAt]);

  useEffect(() => {
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFrameRef = (node: HTMLDivElement | null) => {
    frameRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const triggerClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      close();
      setClosing(false);
    }, 200);
  };

  const toggleMaximize = () => {
    setSizeMode(state.sizeMode === 'maximized' ? 'normal' : 'maximized');
  };

  const scheduleBounds = (bounds: WindowBounds) => {
    pendingBoundsRef.current = bounds;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const pending = pendingBoundsRef.current;
      pendingBoundsRef.current = null;
      if (pending) setBounds(pending);
    });
  };

  function handleTitlePointerDown(e: ReactPointerEvent<HTMLElement>) {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;

    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;

    e.preventDefault();
    capturePointer(e);
    focus();

    const rectBounds = rectToBounds(rect);
    let startBounds =
      state.sizeMode === 'normal'
        ? clampBounds(state.bounds ?? rectBounds)
        : clampBounds(state.bounds ?? getInitialBounds(size, offset));

    if (state.sizeMode !== 'normal') {
      const pointerRatio = (e.clientX - rect.left) / Math.max(rect.width, 1);
      startBounds = clampBounds({
        ...startBounds,
        x: clamp(
          e.clientX - startBounds.width * pointerRatio,
          VIEWPORT_GUTTER,
          window.innerWidth - startBounds.width - VIEWPORT_GUTTER,
        ),
        y: VIEWPORT_GUTTER,
      });
      setSizeMode('normal', startBounds);
    } else if (!state.bounds) {
      startBounds = clampBounds(rectBounds);
      setBounds(startBounds);
    }

    dragRef.current = {
      pointerId: e.pointerId,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      startBounds,
      snap: null,
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
  }

  function handleResizePointerDown(
    e: ReactPointerEvent<HTMLElement>,
    direction: ResizeDirection,
  ) {
    if (e.button !== 0 || state.sizeMode !== 'normal') return;

    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;

    e.preventDefault();
    e.stopPropagation();
    capturePointer(e);
    focus();

    const startBounds = clampBounds(state.bounds ?? rectToBounds(rect));
    if (!state.bounds) setBounds(startBounds);

    resizeRef.current = {
      pointerId: e.pointerId,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      startBounds,
      direction,
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
  }

  function handleGlobalPointerMove(e: PointerEvent) {
    const resize = resizeRef.current;
    if (resize && e.pointerId === resize.pointerId) {
      const next = getResizeBounds(
        resize.startBounds,
        resize.direction,
        e.clientX - resize.startPointerX,
        e.clientY - resize.startPointerY,
      );
      scheduleBounds(next);
      return;
    }

    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;

    const next = clampBounds({
      ...drag.startBounds,
      x: drag.startBounds.x + e.clientX - drag.startPointerX,
      y: drag.startBounds.y + e.clientY - drag.startPointerY,
    });

    const nextSnap =
      e.clientX <= SNAP_EDGE
        ? 'snapped-left'
        : e.clientX >= window.innerWidth - SNAP_EDGE
          ? 'snapped-right'
          : null;

    drag.snap = nextSnap;
    setSnapPreview(nextSnap);
    scheduleBounds(next);
  }

  function handleGlobalPointerUp(e: PointerEvent) {
    const resize = resizeRef.current;
    if (resize && e.pointerId === resize.pointerId) {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      resizeRef.current = null;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      const pending = pendingBoundsRef.current;
      pendingBoundsRef.current = null;
      if (pending) setBounds(pending);
      return;
    }

    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;

    window.removeEventListener('pointermove', handleGlobalPointerMove);
    window.removeEventListener('pointerup', handleGlobalPointerUp);
    dragRef.current = null;
    setSnapPreview(null);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (drag.snap) {
      pendingBoundsRef.current = null;
      setSizeMode(drag.snap);
      return;
    }

    const pending = pendingBoundsRef.current;
    pendingBoundsRef.current = null;
    if (pending) setBounds(pending);
  }

  if (!state.isOpen || state.isMinimized) return null;

  const normalBounds = state.bounds ?? getInitialBounds(size, offset);
  const modeLayout = getModeLayout(state.sizeMode);
  const frameStyle: CSSProperties = {
    zIndex: 100 + (isFocused ? 1000 : stackIndex),
    ...(modeLayout
      ? modeLayout.frame
      : {
          left: normalBounds.x,
          top: normalBounds.y,
          transform: 'none',
        }),
  };

  const innerStyle: CSSProperties = {
    transformOrigin: state.origin
      ? `var(--origin-x) var(--origin-y)`
      : 'center',
    ...(state.sizeMode === 'normal'
      ? { width: normalBounds.width, height: normalBounds.height }
      : modeLayout?.inner),
  };

  const originStyle = state.origin
    ? ({
        ['--origin-x' as string]: `${state.origin.x}px`,
        ['--origin-y' as string]: `${state.origin.y}px`,
      } as CSSProperties)
    : undefined;

  return (
    <>
      {snapPreview && (
        <div
          aria-hidden
          className="pointer-events-none fixed rounded-window border border-accent/60 bg-accent/15 shadow-floating"
          style={{ ...getSnapPreviewStyle(snapPreview), zIndex: 95 }}
        />
      )}

      <div
        ref={setFrameRef}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        onMouseDown={() => {
          if (!isFocused) focus();
        }}
        className="fixed pointer-events-none"
        style={frameStyle}
      >
        <div
          className={cn(
            'pointer-events-auto relative flex flex-col overflow-hidden border',
            'transition-[border-color,opacity,box-shadow] duration-200',
            state.sizeMode === 'maximized'
              ? 'rounded-none bg-bg-1'
              : 'rounded-window mica',
            isFocused
              ? 'border-hairline opacity-100 shadow-window'
              : 'border-border/40 opacity-90 shadow-floating',
            closing ? 'animate-window-close' : 'animate-window-open',
          )}
          style={{
            ...innerStyle,
            ...originStyle,
          }}
        >
          <header
            className="flex h-9 shrink-0 cursor-grab touch-none select-none items-center justify-between border-b border-hairline pl-3 active:cursor-grabbing"
            onPointerDown={handleTitlePointerDown}
            onDoubleClick={(e) => {
              if ((e.target as HTMLElement).closest('button')) return;
              toggleMaximize();
            }}
          >
            <div className="flex min-w-0 items-center gap-2 text-fg-1">
              {icon && <span className="shrink-0 text-accent">{icon}</span>}
              <span
                id={titleId}
                className={cn(
                  'truncate text-[13px] font-medium tracking-wide',
                  isFocused ? 'text-fg-0' : 'text-fg-2',
                )}
              >
                {title}
              </span>
            </div>
            <div className="flex h-full shrink-0">
              <ControlButton
                label="Minimize"
                onClick={minimize}
                kind="minimize"
              >
                <MinimizeIcon className="h-4 w-4" />
              </ControlButton>
              <ControlButton
                label={state.sizeMode === 'maximized' ? 'Restore' : 'Maximize'}
                onClick={toggleMaximize}
                kind="maximize"
              >
                <MaximizeIcon className="h-4 w-4" />
              </ControlButton>
              <ControlButton label="Close" onClick={triggerClose} kind="close">
                <CloseIcon className="h-4 w-4" />
              </ControlButton>
            </div>
          </header>

          <div
            ref={contentRef}
            tabIndex={-1}
            className="min-h-0 flex-1 overflow-y-auto outline-none"
          >
            {children}
          </div>

          {state.sizeMode === 'normal' && !closing && (
            <ResizeHandles onPointerDown={handleResizePointerDown} />
          )}
        </div>
      </div>
    </>
  );
});

function ResizeHandles({
  onPointerDown,
}: {
  onPointerDown: (
    e: ReactPointerEvent<HTMLElement>,
    direction: ResizeDirection,
  ) => void;
}) {
  const handles: Array<{
    direction: ResizeDirection;
    className: string;
  }> = [
    {
      direction: 'n',
      className: 'inset-x-3 top-0 h-2 cursor-n-resize',
    },
    {
      direction: 's',
      className: 'inset-x-3 bottom-0 h-2 cursor-s-resize',
    },
    {
      direction: 'e',
      className: 'right-0 top-3 bottom-3 w-2 cursor-e-resize',
    },
    {
      direction: 'w',
      className: 'left-0 top-3 bottom-3 w-2 cursor-w-resize',
    },
    {
      direction: 'ne',
      className: 'right-0 top-0 h-4 w-4 cursor-ne-resize',
    },
    {
      direction: 'nw',
      className: 'left-0 top-0 h-4 w-4 cursor-nw-resize',
    },
    {
      direction: 'se',
      className: 'right-0 bottom-0 h-4 w-4 cursor-se-resize',
    },
    {
      direction: 'sw',
      className: 'left-0 bottom-0 h-4 w-4 cursor-sw-resize',
    },
  ];

  return (
    <>
      {handles.map(({ direction, className }) => (
        <div
          key={direction}
          aria-hidden
          className={cn('absolute z-20 touch-none', className)}
          onPointerDown={(e) => onPointerDown(e, direction)}
        />
      ))}
    </>
  );
}

function capturePointer(e: ReactPointerEvent<HTMLElement>) {
  if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
    e.currentTarget.setPointerCapture(e.pointerId);
  }
}

function rectToBounds(rect: DOMRect): WindowBounds {
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

function getInitialBounds(size: Size, offset: number): WindowBounds {
  const normalSize = getNormalSize(size);
  return clampBounds({
    width: normalSize.width,
    height: normalSize.height,
    x: (getViewportWidth() - normalSize.width) / 2 + offset,
    y:
      (getViewportHeight() - TASKBAR_RESERVE - normalSize.height) / 2 + offset,
  });
}

function getNormalSize(size: Size) {
  const preferred = preferredSizes[size];
  const maxWidth = Math.max(1, getViewportWidth() - VIEWPORT_GUTTER * 2);
  const maxHeight = Math.max(
    1,
    getViewportHeight() - TASKBAR_RESERVE - VIEWPORT_GUTTER * 2,
  );

  return {
    width: clampDimension(preferred.width, MIN_WINDOW_WIDTH, maxWidth),
    height: clampDimension(preferred.height, MIN_WINDOW_HEIGHT, maxHeight),
  };
}

function getResizeBounds(
  start: WindowBounds,
  direction: ResizeDirection,
  deltaX: number,
  deltaY: number,
): WindowBounds {
  const minWidth = getEffectiveMinWidth();
  const minHeight = getEffectiveMinHeight();
  const maxRight = getViewportWidth() - VIEWPORT_GUTTER;
  const maxBottom = getViewportHeight() - TASKBAR_RESERVE - VIEWPORT_GUTTER;

  let left = start.x;
  let top = start.y;
  let right = start.x + start.width;
  let bottom = start.y + start.height;

  if (direction.includes('e')) {
    right = clamp(start.x + start.width + deltaX, left + minWidth, maxRight);
  }
  if (direction.includes('w')) {
    left = clamp(start.x + deltaX, VIEWPORT_GUTTER, right - minWidth);
  }
  if (direction.includes('s')) {
    bottom = clamp(start.y + start.height + deltaY, top + minHeight, maxBottom);
  }
  if (direction.includes('n')) {
    top = clamp(start.y + deltaY, VIEWPORT_GUTTER, bottom - minHeight);
  }

  return clampBounds({
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  });
}

function clampBounds(bounds: WindowBounds): WindowBounds {
  const width = clampDimension(
    bounds.width,
    MIN_WINDOW_WIDTH,
    getViewportWidth() - VIEWPORT_GUTTER * 2,
  );
  const height = clampDimension(
    bounds.height,
    MIN_WINDOW_HEIGHT,
    getViewportHeight() - TASKBAR_RESERVE - VIEWPORT_GUTTER * 2,
  );
  const maxX = Math.max(VIEWPORT_GUTTER, getViewportWidth() - width - VIEWPORT_GUTTER);
  const maxY = Math.max(
    VIEWPORT_GUTTER,
    getViewportHeight() - TASKBAR_RESERVE - height - VIEWPORT_GUTTER,
  );

  return {
    x: clamp(bounds.x, VIEWPORT_GUTTER, maxX),
    y: clamp(bounds.y, VIEWPORT_GUTTER, maxY),
    width,
    height,
  };
}

function getEffectiveMinWidth() {
  return Math.max(
    1,
    Math.min(MIN_WINDOW_WIDTH, getViewportWidth() - VIEWPORT_GUTTER * 2),
  );
}

function getEffectiveMinHeight() {
  return Math.max(
    1,
    Math.min(
      MIN_WINDOW_HEIGHT,
      getViewportHeight() - TASKBAR_RESERVE - VIEWPORT_GUTTER * 2,
    ),
  );
}

function clampDimension(value: number, min: number, max: number) {
  const effectiveMax = Math.max(1, max);
  const effectiveMin = Math.min(min, effectiveMax);
  return clamp(value, effectiveMin, effectiveMax);
}

function getViewportWidth() {
  if (typeof window === 'undefined') return 1024;
  return window.innerWidth;
}

function getViewportHeight() {
  if (typeof window === 'undefined') return 768;
  return window.innerHeight;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function getModeLayout(sizeMode: WindowSizeMode):
  | { frame: CSSProperties; inner: CSSProperties }
  | null {
  if (sizeMode === 'normal') return null;

  const height = `calc(100dvh - ${TASKBAR_RESERVE}px)`;
  if (sizeMode === 'maximized') {
    return {
      frame: { left: 0, top: 0, transform: 'none' },
      inner: {
        width: '100vw',
        height,
      },
    };
  }

  return {
    frame: {
      left:
        sizeMode === 'snapped-left'
          ? VIEWPORT_GUTTER
          : `calc(50vw + ${VIEWPORT_GUTTER / 2}px)`,
      top: VIEWPORT_GUTTER,
      transform: 'none',
    },
    inner: {
      width: `calc(50vw - ${VIEWPORT_GUTTER * 1.5}px)`,
      height: `calc(100dvh - ${TASKBAR_RESERVE + VIEWPORT_GUTTER}px)`,
    },
  };
}

function getSnapPreviewStyle(sizeMode: WindowSizeMode): CSSProperties {
  const layout = getModeLayout(sizeMode);
  return {
    ...layout?.frame,
    ...layout?.inner,
  };
}

function ControlButton({
  label,
  onClick,
  kind,
  children,
}: {
  label: string;
  onClick: () => void;
  kind: 'close' | 'minimize' | 'maximize';
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        'flex h-full w-11 items-center justify-center text-fg-2',
        'transition-colors duration-150',
        kind === 'close'
          ? 'hover:bg-warm/90 hover:text-white'
          : 'hover:bg-fg-0/10 hover:text-fg-0',
      )}
    >
      {children}
    </button>
  );
}
