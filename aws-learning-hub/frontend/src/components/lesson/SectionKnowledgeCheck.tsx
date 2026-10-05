"use client";

import { CheckCircle2, CircleHelp, RotateCcw } from "lucide-react";
import { useState } from "react";

type Question = { question: string; options: { text: string; correct: boolean }[]; explanation?: string };

export function SectionKnowledgeCheck({ section, questions }: { section: string; questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answeredCount = Object.keys(answers).length;
  const score = Object.entries(answers).filter(([questionIndex, optionIndex]) => questions[Number(questionIndex)].options[optionIndex].correct).length;

  return (
    <section className="my-9 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50/70 dark:border-sky-400/20 dark:bg-sky-500/[0.07]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-200/80 bg-white/70 px-5 py-4 dark:border-sky-400/15 dark:bg-white/[0.03]">
        <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-sky-600 text-white shadow-sm"><CircleHelp className="h-5 w-5" /></span><div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">Section knowledge check</p><h3 className="text-sm font-bold text-slate-900 dark:text-white">Củng cố: {section}</h3></div></div>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800 dark:bg-sky-400/15 dark:text-sky-200">{answeredCount}/{questions.length} câu</span>
      </div>
      <div className="space-y-6 p-5 sm:p-6">
        {questions.map((item, questionIndex) => {
          const selected = answers[questionIndex];
          const answered = selected !== undefined;
          return <div key={item.question} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111520]">
            <p className="mb-3 font-semibold leading-6 text-slate-800 dark:text-slate-100"><span className="mr-2 text-sky-600 dark:text-sky-300">{questionIndex + 1}.</span>{item.question}</p>
            <div className="grid gap-2">
              {item.options.map((option, optionIndex) => {
                const isSelected = selected === optionIndex;
                const state = !answered ? "border-slate-200 hover:border-sky-400 hover:bg-sky-50 dark:border-white/10 dark:hover:border-sky-400/60 dark:hover:bg-sky-400/10" : option.correct ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-500/10 dark:text-emerald-100" : isSelected ? "border-rose-400 bg-rose-50 text-rose-950 dark:bg-rose-500/10 dark:text-rose-100" : "border-slate-200 bg-slate-50 text-slate-400 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-500";
                return <button key={option.text} type="button" disabled={answered} onClick={() => setAnswers(current => ({ ...current, [questionIndex]: optionIndex }))} className={`rounded-lg border px-3 py-2.5 text-left text-sm transition disabled:cursor-default ${state}`}><span className="mr-2 font-bold">{String.fromCharCode(65 + optionIndex)}.</span>{option.text}</button>;
              })}
            </div>
            {answered && <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.explanation}</p>}
          </div>;
        })}
      </div>
      {answeredCount === questions.length && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sky-200/80 bg-white/60 px-5 py-4 text-sm dark:border-sky-400/15 dark:bg-white/[0.03]"><span className="inline-flex items-center gap-2 font-bold text-slate-800 dark:text-white"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Bạn đúng {score}/{questions.length} câu</span><button type="button" onClick={() => setAnswers({})} className="inline-flex items-center gap-1.5 font-semibold text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-100"><RotateCcw className="h-4 w-4" /> Làm lại phần này</button></div>}
    </section>
  );
}
