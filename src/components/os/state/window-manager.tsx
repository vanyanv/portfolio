'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import {
  WINDOW_IDS,
  type OriginPoint,
  type WindowBounds,
  type WindowId,
  type WindowSizeMode,
  type WindowState,
} from './types';

type Action =
  | { type: 'open'; id: WindowId; origin: OriginPoint | null }
  | { type: 'close'; id: WindowId }
  | { type: 'focus'; id: WindowId }
  | { type: 'minimize'; id: WindowId }
  | { type: 'restore'; id: WindowId }
  | { type: 'set-bounds'; id: WindowId; bounds: WindowBounds }
  | {
      type: 'size-mode';
      id: WindowId;
      sizeMode: WindowSizeMode;
      bounds?: WindowBounds | null;
    };

type State = {
  windows: Record<WindowId, WindowState>;
  focusedId: WindowId | null;
  recents: WindowId[];
};

const initialWindows = WINDOW_IDS.reduce(
  (acc, id) => {
    acc[id] = {
      id,
      isOpen: false,
      isMinimized: false,
      openedAt: 0,
      origin: null,
      bounds: null,
      lastNormalBounds: null,
      sizeMode: 'normal',
    };
    return acc;
  },
  {} as Record<WindowId, WindowState>,
);

const initialState: State = {
  windows: initialWindows,
  focusedId: null,
  recents: [],
};

const RECENTS_MAX = 5;
const updateRecents = (recents: WindowId[], id: WindowId) =>
  [id, ...recents.filter((r) => r !== id)].slice(0, RECENTS_MAX);

function reducer(state: State, action: Action): State {
  const w = state.windows[action.id];
  switch (action.type) {
    case 'open': {
      const wasOpen = w.isOpen;
      return {
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            isOpen: true,
            isMinimized: false,
            openedAt: Date.now(),
            origin: action.origin,
            bounds: wasOpen ? w.bounds : null,
            lastNormalBounds: wasOpen ? w.lastNormalBounds : null,
            sizeMode: wasOpen ? w.sizeMode : 'normal',
          },
        },
        focusedId: action.id,
        recents: updateRecents(state.recents, action.id),
      };
    }
    case 'close':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            isOpen: false,
            isMinimized: false,
            bounds: null,
            lastNormalBounds: null,
            sizeMode: 'normal',
          },
        },
        focusedId: state.focusedId === action.id ? null : state.focusedId,
      };
    case 'focus':
      if (!w.isOpen) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...w, openedAt: Date.now(), isMinimized: false },
        },
        focusedId: action.id,
      };
    case 'minimize':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...w, isMinimized: true },
        },
        focusedId: state.focusedId === action.id ? null : state.focusedId,
      };
    case 'restore':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...w, isMinimized: false, openedAt: Date.now() },
        },
        focusedId: action.id,
      };
    case 'set-bounds':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            bounds: action.bounds,
            lastNormalBounds: action.bounds,
            sizeMode: 'normal',
          },
        },
      };
    case 'size-mode': {
      const nextBounds =
        action.sizeMode === 'normal'
          ? action.bounds ?? w.lastNormalBounds ?? w.bounds
          : action.bounds ?? w.bounds;

      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            openedAt: Date.now(),
            bounds: nextBounds,
            lastNormalBounds:
              action.sizeMode === 'normal'
                ? null
                : w.sizeMode === 'normal'
                  ? w.bounds
                  : w.lastNormalBounds,
            sizeMode: action.sizeMode,
          },
        },
        focusedId: action.id,
      };
    }
  }
}

type Ctx = {
  state: State;
  open: (id: WindowId, origin?: OriginPoint | null) => void;
  close: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  minimize: (id: WindowId) => void;
  restore: (id: WindowId) => void;
  setBounds: (id: WindowId, bounds: WindowBounds) => void;
  setSizeMode: (
    id: WindowId,
    sizeMode: WindowSizeMode,
    bounds?: WindowBounds | null,
  ) => void;
};

const WindowManagerContext = createContext<Ctx | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const open = useCallback(
    (id: WindowId, origin: OriginPoint | null = null) =>
      dispatch({ type: 'open', id, origin }),
    [],
  );
  const close = useCallback(
    (id: WindowId) => dispatch({ type: 'close', id }),
    [],
  );
  const focus = useCallback(
    (id: WindowId) => dispatch({ type: 'focus', id }),
    [],
  );
  const minimize = useCallback(
    (id: WindowId) => dispatch({ type: 'minimize', id }),
    [],
  );
  const restore = useCallback(
    (id: WindowId) => dispatch({ type: 'restore', id }),
    [],
  );
  const setBounds = useCallback(
    (id: WindowId, bounds: WindowBounds) =>
      dispatch({ type: 'set-bounds', id, bounds }),
    [],
  );
  const setSizeMode = useCallback(
    (
      id: WindowId,
      sizeMode: WindowSizeMode,
      bounds: WindowBounds | null = null,
    ) => dispatch({ type: 'size-mode', id, sizeMode, bounds }),
    [],
  );

  const value = useMemo(
    () => ({
      state,
      open,
      close,
      focus,
      minimize,
      restore,
      setBounds,
      setSizeMode,
    }),
    [state, open, close, focus, minimize, restore, setBounds, setSizeMode],
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx)
    throw new Error('useWindowManager must be used inside WindowManagerProvider');
  return ctx;
}

export function useWindow(id: WindowId) {
  const ctx = useWindowManager();
  return {
    state: ctx.state.windows[id],
    isFocused: ctx.state.focusedId === id,
    open: (origin?: OriginPoint | null) => ctx.open(id, origin),
    close: () => ctx.close(id),
    focus: () => ctx.focus(id),
    minimize: () => ctx.minimize(id),
    restore: () => ctx.restore(id),
    setBounds: (bounds: WindowBounds) => ctx.setBounds(id, bounds),
    setSizeMode: (sizeMode: WindowSizeMode, bounds?: WindowBounds | null) =>
      ctx.setSizeMode(id, sizeMode, bounds),
  };
}
