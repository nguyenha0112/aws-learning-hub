"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { useLearningProgress } from "@/components/LearningProgressProvider";

export function LessonCompletion({ lessonId }: { lessonId: string }) {
  const { locale } = useLanguage();
  const { isCompleted, toggleCompleted, setLastLesson } = useLearningProgress();
  const completed = isCompleted(lessonId);
  useEffect(() => { setLastLesson(lessonId); }, [lessonId, setLastLesson]);
  return <button type="button" onClick={() => toggleCompleted(lessonId)} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${completed ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200" : "border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"}`}>{completed ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}{completed ? (locale === "vi" ? "Đã hoàn thành" : "Completed") : (locale === "vi" ? "Đánh dấu hoàn thành" : "Mark complete")}</button>;
}
