import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { StudentProfile } from "../types/models";
import { ensureSeedStudents, getStudent, listStudents, updateStudent, awardXp as awardXpRepo } from "../data/store/repository";

interface StudentContextValue {
  students: StudentProfile[];
  activeStudentId: string | null;
  activeStudent: StudentProfile | null;
  selectStudent: (id: string) => void;
  refreshStudents: () => void;
  patchActiveStudent: (patch: Partial<StudentProfile>) => void;
  awardXp: (amount: number, minutesSpent?: number) => void;
  goToParentArea: boolean;
  setGoToParentArea: (v: boolean) => void;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

const ACTIVE_KEY = "wordup:v1:activeStudentId";

export function StudentProvider({ children }: { children: React.ReactNode }) {
  // Read localStorage synchronously in the initializer (not in a useEffect)
  // so the very first render already knows who's logged in. Restoring this
  // asynchronously caused a real bug: on a hard refresh, the route guards
  // would see activeStudent as null for one tick and redirect to /welcome
  // before the restoration effect ever ran - bouncing a mid-lesson student
  // back to the profile picker every time they refreshed.
  const [students, setStudents] = useState<StudentProfile[]>(() => ensureSeedStudents());
  const [activeStudentId, setActiveStudentId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = window.localStorage.getItem(ACTIVE_KEY);
    return saved && listStudents().some((s) => s.id === saved) ? saved : null;
  });
  const [goToParentArea, setGoToParentArea] = useState(false);

  const refreshStudents = useCallback(() => {
    setStudents(listStudents());
  }, []);

  const selectStudent = useCallback((id: string) => {
    setActiveStudentId(id);
    window.localStorage.setItem(ACTIVE_KEY, id);
    setGoToParentArea(false);
  }, []);

  const activeStudent = useMemo(() => {
    if (!activeStudentId) return null;
    return students.find((s) => s.id === activeStudentId) ?? getStudent(activeStudentId) ?? null;
  }, [students, activeStudentId]);

  const patchActiveStudent = useCallback(
    (patch: Partial<StudentProfile>) => {
      if (!activeStudentId) return;
      updateStudent(activeStudentId, patch);
      refreshStudents();
    },
    [activeStudentId, refreshStudents]
  );

  const awardXp = useCallback(
    (amount: number, minutesSpent = 0) => {
      if (!activeStudentId) return;
      awardXpRepo(activeStudentId, amount, minutesSpent);
      refreshStudents();
    },
    [activeStudentId, refreshStudents]
  );

  const value: StudentContextValue = {
    students,
    activeStudentId,
    activeStudent,
    selectStudent,
    refreshStudents,
    patchActiveStudent,
    awardXp,
    goToParentArea,
    setGoToParentArea,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudentContext(): StudentContextValue {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudentContext must be used within a StudentProvider");
  return ctx;
}
