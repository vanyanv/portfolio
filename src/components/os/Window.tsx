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
import type { OriginPoint, WindowId, WindowSizeMode } from './state/types';
import { cn } from '@/lib/cn';
import { CloseIcon, MaximizeIcon, MinimizeIcon } from './icons';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<Size, string> = {
  sm: 'w-[min(440px,calc(100vw-16px))] h-[min(420px,calc(100dvh-110px))]',
  md: 'w-[min(640px,calc(100vw-16px))] h-[min(540px,calc(100dvh-110px))]',
  lg: 'w-[min(820px,calc(100vw-16px))] h-[min(600px,calc(100dvh-110px))]',
  xl: 'w-[min(920px,calc(100vw-16px))] h-[min(640px,calc(100dvh-110px))]',
};

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
  startX: number;
  startY: number;
  width: number;
  height: number;
  snap: WindowSizeMode | null;
};

const CASCADE_OFFSET = 32;
const VIEWPORT_GUTTER = 8;
const SNAP_EDGE = 28;
const TASKBAR_RESERVE = 80;

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
    move,
    setSizeMode,
  } = useWindow(id);
  const [closing, setClosing] = useState(false);
  const [snapPreview, setSnapPreview] = useState<WindowSizeMode | null>(null);
  const titleId = useId();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const pendingPositionRef = useRef<OriginPoint | null>(null);
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

  const scheduleMove = (position: OriginPoint) => {
    pendingPositionRef.current = position;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const pending = pendingPositionRef.current;
      pendingPositionRef.current = null;
      if (pending) move(pending);
    });
  };

  function handleTitlePointerDown(e: ReactPointerEvent<HTMLElement>) {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;

    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;

    e.preventDefault();
    focus();

    const normalSize =
      state.sizeMode === 'normal'
        ? { width: rect.width, height: rect.height }
        : getNormalSize(size);

    let startX = rect.left;
    let startY = rect.top;

    if (state.sizeMode !== 'normal') {
      const pointerRatio = (e.clientX - rect.left) / Math.max(rect.width, 1);
      startX = clamp(
        e.clientX - normalSize.width * pointerRatio,
        VIEWPORT_GUTTER,
        window.innerWidth - normalSize.width - VIEWPORT_GUTTER,
      );
      startY = VIEWPORT_GUTTER;
      setSizeMode('normal', { x: startX, y: startY });
    } else if (!state.position) {
      const clamped = clampPosition(
        { x: rect.left, y: rect.top },
        rect.width,
        rect.height,
      );
      startX = clamped.x;
      startY = clamped.y;
      move(clamped);
    }

    dragRef.current = {
      pointerId: e.pointerId,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      startX,
      startY,
      width: normalSize.width,
      height: normalSize.height,
      snap: null,
    };

    window.addEventListener('pointermove', handleGlobalPointerMove);
    window.addEventListener('pointerup', handleGlobalPointerUp);
  }

  function handleGlobalPointerMove(e: PointerEvent) {
    const drag = dragRef.current;
    if (!drag || e.pointerId !== drag.pointerId) return;

    const next = clampPosition(
      {
        x: drag.startX + e.clientX - drag.startPointerX,
        y: drag.startY + e.clientY - drag.startPointerY,
      },
      drag.width,
      drag.height,
    );

    const nextSnap =
      e.clientX <= SNAP_EDGE
        ? 'snapped-left'
        : e.clientX >= window.innerWidth - SNAP_EDGE
          ? 'snapped-right'
          : null;

    drag.snap = nextSnap;
    setSnapPreview(nextSnap);
    scheduleMove(next);
  }

  function handleGlobalPointerUp(e: PointerEvent) {
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
      pendingPositionRef.current = null;
      setSizeMode(drag.snap);
      return;
    }

    const pending = pendingPositionRef.current;
    pendingPositionRef.current = null;
    if (pending) move(pending);
  }

  if (!state.isOpen || state.isMinimized) return null;

  const modeLayout = getModeLayout(state.sizeMode);
  const frameStyle: CSSProperties = {
    zIndex: 100 + (isFocused ? 1000 : stackIndex),
    ...(modeLayout
      ? modeLayout.frame
      : state.position
        ? {
            left: state.position.x,
            top: state.position.y,
            transform: 'none',
          }
        : {
            left: '50%',
            top: `calc(50% - ${TASKBAR_RESERVE / 2}px + ${offset}px)`,
            transform: `translate(calc(-50% + ${offset}px), -50%)`,
          }),
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
            'pointer-events-auto flex flex-col overflow-hidden rounded-window border mica',
            'transition-[border-color,opacity,box-shadow] duration-200',
            isFocused
              ? 'border-hairline opacity-100 shadow-window'
              : 'border-border/40 opacity-90 shadow-floating',
            state.sizeMode === 'normal' && sizeClasses[size],
            closing ? 'animate-window-close' : 'animate-window-open',
          )}
          style={{
            transformOrigin: state.origin
              ? `var(--origin-x) var(--origin-y)`
              : 'center',
            ...originStyle,
            ...modeLayout?.inner,
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
        </div>
      </div>
    </>
  );
});

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

function getNormalSize(size: Size) {
  const preferred = preferredSizes[size];
  return {
    width: Math.min(preferred.width, window.innerWidth - VIEWPORT_GUTTER * 2),
    height: Math.min(preferred.height, window.innerHeight - 110),
  };
}

function clampPosition(
  position: OriginPoint,
  width: number,
  height: number,
): OriginPoint {
  const maxX = Math.max(VIEWPORT_GUTTER, window.innerWidth - width - VIEWPORT_GUTTER);
  const maxY = Math.max(
    VIEWPORT_GUTTER,
    window.innerHeight - TASKBAR_RESERVE - height,
  );

  return {
    x: clamp(position.x, VIEWPORT_GUTTER, maxX),
    y: clamp(position.y, VIEWPORT_GUTTER, maxY),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getModeLayout(sizeMode: WindowSizeMode):
  | { frame: CSSProperties; inner: CSSProperties }
  | null {
  if (sizeMode === 'normal') return null;

  const height = `calc(100dvh - ${TASKBAR_RESERVE + VIEWPORT_GUTTER}px)`;
  if (sizeMode === 'maximized') {
    return {
      frame: { left: VIEWPORT_GUTTER, top: VIEWPORT_GUTTER, transform: 'none' },
      inner: {
        width: `calc(100vw - ${VIEWPORT_GUTTER * 2}px)`,
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
      height,
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
