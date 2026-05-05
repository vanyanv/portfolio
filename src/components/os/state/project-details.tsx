'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import projects from '@/data';
import type { OriginPoint } from './types';
import { useWindowManager } from './window-manager';

type ProjectDetailsContextValue = {
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  openProjectDetails: (id: string, origin?: OriginPoint | null) => void;
};

const ProjectDetailsContext =
  createContext<ProjectDetailsContextValue | null>(null);

export function ProjectDetailsProvider({ children }: { children: ReactNode }) {
  const { open } = useWindowManager();
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id ?? '',
  );

  const openProjectDetails = useCallback(
    (id: string, origin: OriginPoint | null = null) => {
      setSelectedProjectId(id);
      open('projectDetails', origin);
    },
    [open],
  );

  const value = useMemo(
    () => ({ selectedProjectId, setSelectedProjectId, openProjectDetails }),
    [selectedProjectId, openProjectDetails],
  );

  return (
    <ProjectDetailsContext.Provider value={value}>
      {children}
    </ProjectDetailsContext.Provider>
  );
}

export function useProjectDetails() {
  const ctx = useContext(ProjectDetailsContext);
  if (!ctx) {
    throw new Error('useProjectDetails must be used inside ProjectDetailsProvider');
  }
  return ctx;
}
