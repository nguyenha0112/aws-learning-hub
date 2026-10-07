"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type QuizOption = { text: string; correct: boolean };
type Quiz = { question: string; question_en?: string; options: QuizOption[]; explanation?: string; explanation_en?: string };

export function LessonQuiz({ quiz }: { quiz: Quiz }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const { t, locale } = useLanguage();
  const question = locale === "en" && quiz.question_en ? quiz.question_en : quiz.question;
  const explanation = locale === "en" && quiz.explanation_en ? quiz.explanation_en : quiz.explanation;

  return (
    <section className="mt-7 rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50/70 p-6 shadow-[0_16px_50px_-32px_rgba(234,88,12,0.5)] dark:border-orange-500/20 dark:from-orange-950/30 dark:to-[#111520] sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-3"><div><p className="mb-1 text-xs font-extrabold tracking-[0.16em] text-orange-600 dark:text-orange-400">{t("knowledgeCheck")}</p><h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t("checkNow")}</h2></div><span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-orange-700 shadow-sm dark:bg-orange-500/15 dark:text-orange-300">1 {t("question")}</span></div>
      <p className="mt-4 font-medium text-gray-800 dark:text-gray-200">{question}</p>
      <div className="mt-5 space-y-3">
        {quiz.options.map((option, index) => {
          const isSelected = selected === index;
          const stateClass = !answered
            ? "border-gray-200 bg-white hover:border-orange-400 hover:bg-orange-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-orange-700"
            : option.correct
              ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-100"
              : isSelected
                ? "border-rose-400 bg-rose-50 text-rose-950 dark:bg-rose-950/50 dark:text-rose-100"
                : "border-gray-200 bg-white/60 text-gray-500 dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400";
          return (
            <button
              key={option.text}
              type="button"
              disabled={answered}
              onClick={() => setSelected(index)}
              className={`w-full rounded-xl border p-4 text-left transition-colors disabled:cursor-default ${stateClass}`}
            >
              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
              {option.text}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-5 rounded-xl border border-orange-200 bg-white/80 p-4 text-sm text-gray-700 dark:border-orange-900/70 dark:bg-gray-950/60 dark:text-gray-300">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {quiz.options[selected]?.correct ? t("correct") : t("incorrect")}
          </p>
          {explanation && <p className="mt-1 leading-6">{explanation}</p>}
          <button type="button" onClick={() => setSelected(null)} className="mt-3 font-semibold text-orange-700 hover:text-orange-800 dark:text-orange-400">
            {t("retry")}
          </button>
        </div>
      )}
    </section>
  );
}
