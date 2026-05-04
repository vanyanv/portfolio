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
  | { type: 'move'; id: WindowId; position: OriginPoint }
  | {
      type: 'size-mode';
      id: WindowId;
      sizeMode: WindowSizeMode;
      position?: OriginPoint | null;
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
      position: null,
      lastNormalPosition: null,
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
            position: wasOpen ? w.position : null,
            lastNormalPosition: wasOpen ? w.lastNormalPosition : null,
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
            position: null,
            lastNormalPosition: null,
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
    case 'move':
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            position: action.position,
            lastNormalPosition: action.position,
            sizeMode: 'normal',
          },
        },
      };
    case 'size-mode': {
      const nextPosition =
        action.sizeMode === 'normal'
          ? action.position ?? w.lastNormalPosition ?? w.position
          : action.position ?? w.position;

      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...w,
            openedAt: Date.now(),
            position: nextPosition,
            lastNormalPosition:
              action.sizeMode === 'normal'
                ? null
                : w.sizeMode === 'normal'
                  ? w.position
                  : w.lastNormalPosition,
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
  move: (id: WindowId, position: OriginPoint) => void;
  setSizeMode: (
    id: WindowId,
    sizeMode: WindowSizeMode,
    position?: OriginPoint | null,
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
  const move = useCallback(
    (id: WindowId, position: OriginPoint) =>
      dispatch({ type: 'move', id, position }),
    [],
  );
  const setSizeMode = useCallback(
    (
      id: WindowId,
      sizeMode: WindowSizeMode,
      position: OriginPoint | null = null,
    ) => dispatch({ type: 'size-mode', id, sizeMode, position }),
    [],
  );

  const value = useMemo(
    () => ({ state, open, close, focus, minimize, restore, move, setSizeMode }),
    [state, open, close, focus, minimize, restore, move, setSizeMode],
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
    move: (position: OriginPoint) => ctx.move(id, position),
    setSizeMode: (sizeMode: WindowSizeMode, position?: OriginPoint | null) =>
      ctx.setSizeMode(id, sizeMode, position),
  };
}
