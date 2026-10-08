"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ProgressContextValue = {
  completedIds: string[];
  lastLessonId: string | null;
  toggleCompleted: (lessonId: string) => void;
  setLastLesson: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);
const completedCookie = "aws-learning-completed";
const lastLessonCookie = "aws-learning-last-lesson";

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] ?? "";
}

function getInitialCompleted() {
  return decodeURIComponent(getCookie(completedCookie)).split(",").filter(Boolean);
}

function getInitialLastLesson() {
  return decodeURIComponent(getCookie(lastLessonCookie)) || null;
}

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>(getInitialCompleted);
  const [lastLessonId, setLastLessonId] = useState<string | null>(getInitialLastLesson);

  useEffect(() => {
    document.cookie = `${completedCookie}=${encodeURIComponent(completedIds.join(","))}; path=/; max-age=31536000; samesite=lax`;
  }, [completedIds]);

  const value = useMemo<ProgressContextValue>(() => ({
    completedIds,
    lastLessonId,
    toggleCompleted: (lessonId) => setCompletedIds(current => current.includes(lessonId) ? current.filter(id => id !== lessonId) : [...current, lessonId]),
    setLastLesson: (lessonId) => {
      setLastLessonId(lessonId);
      document.cookie = `${lastLessonCookie}=${encodeURIComponent(lessonId)}; path=/; max-age=31536000; samesite=lax`;
    },
    isCompleted: (lessonId) => completedIds.includes(lessonId),
  }), [completedIds, lastLessonId]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useLearningProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useLearningProgress must be used inside LearningProgressProvider");
  return value;
}
