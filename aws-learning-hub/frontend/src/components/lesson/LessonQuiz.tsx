"use client";

import { useState } from "react";

type QuizOption = { text: string; correct: boolean };
type Quiz = { question: string; options: QuizOption[]; explanation?: string };

export function LessonQuiz({ quiz }: { quiz: Quiz }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <section className="mt-12 rounded-2xl border border-orange-200 bg-orange-50/70 p-6 dark:border-orange-900/70 dark:bg-orange-950/20">
      <p className="mb-2 text-sm font-bold tracking-[0.16em] text-orange-600 dark:text-orange-400">KNOWLEDGE CHECK</p>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Bài tập kiểm tra</h2>
      <p className="mt-4 font-medium text-gray-800 dark:text-gray-200">{quiz.question}</p>
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
            {quiz.options[selected]?.correct ? "Chính xác!" : "Chưa đúng — hãy xem đáp án được tô xanh."}
          </p>
          {quiz.explanation && <p className="mt-1 leading-6">{quiz.explanation}</p>}
          <button type="button" onClick={() => setSelected(null)} className="mt-3 font-semibold text-orange-700 hover:text-orange-800 dark:text-orange-400">
            Làm lại câu này
          </button>
        </div>
      )}
    </section>
  );
}
