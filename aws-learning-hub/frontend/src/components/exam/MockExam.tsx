"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock3, RotateCcw } from "lucide-react";

type Option = { id: string; text: string };
type Question = { id: string; question: string; options: Option[]; correct_option: string; explanation: string; domain?: string };
type Exam = { title: string; certification: string; duration_minutes: number; passing_score: number; questions: Question[] };

const formatTime = (value: number) => `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;

export function MockExam({ exam }: { exam: Exam }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(exam.duration_minutes * 60);
  const question = exam.questions[current];
  const answeredCount = Object.keys(answers).length;
  const score = useMemo(() => exam.questions.reduce((total, item) => total + Number(answers[item.id] === item.correct_option), 0), [answers, exam.questions]);
  const percentage = Math.round((score / exam.questions.length) * 100);

  useEffect(() => {
    if (submitted) return;
    if (secondsLeft <= 0) { setSubmitted(true); return; }
    const timer = window.setTimeout(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft, submitted]);

  const reset = () => { setAnswers({}); setCurrent(0); setSecondsLeft(exam.duration_minutes * 60); setSubmitted(false); };

  if (submitted) return <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950 md:p-8"><CheckCircle2 className="mx-auto h-12 w-12 text-orange-500"/><p className="mt-5 text-sm font-bold uppercase tracking-wider text-orange-600">Kết quả Mock Exam</p><h1 className="mt-2 text-4xl font-bold">{score}/{exam.questions.length}</h1><p className="mt-2 text-gray-500">{percentage}% chính xác · Đã trả lời {answeredCount}/{exam.questions.length} · Mốc tham khảo: {exam.passing_score}/1000</p><div className="mt-8 max-h-[65vh] space-y-4 overflow-y-auto pr-2 text-left">{exam.questions.map((item,index)=><article key={item.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"><p className="text-xs font-bold uppercase tracking-wider text-orange-600">{item.domain || "CLF-C02"}</p><p className="mt-1 font-semibold">{index+1}. {item.question}</p><p className={`mt-2 text-sm ${answers[item.id]===item.correct_option?"text-green-600":"text-red-600"}`}>Bạn chọn: {answers[item.id]||"Chưa trả lời"} · Đúng: {item.correct_option}</p><p className="mt-2 text-sm text-gray-500">{item.explanation}</p></article>)}</div><button onClick={reset} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-white hover:bg-orange-600"><RotateCcw className="h-4 w-4"/> Làm lại</button></section>;

  return <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 md:p-8"><div className="mb-7 flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-bold tracking-wider text-orange-600">{exam.certification} · {exam.duration_minutes} PHÚT</p><h1 className="mt-1 text-2xl font-bold">{exam.title}</h1><p className="mt-1 text-sm text-gray-500">Đã trả lời {answeredCount}/{exam.questions.length} câu</p></div><div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold ${secondsLeft < 300 ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300" : "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300"}`}><Clock3 className="h-4 w-4"/>{formatTime(secondsLeft)}</div></div><div className="mb-7 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"><div className="h-full bg-orange-500 transition-all" style={{width:`${(current+1)/exam.questions.length*100}%`}}/></div><p className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-600">{question.domain || "CLF-C02"} · Câu {current+1}/{exam.questions.length}</p><h2 className="text-xl font-semibold leading-8">{question.question}</h2><div className="mt-6 space-y-3">{question.options.map(option=><button key={option.id} onClick={()=>setAnswers(old=>({...old,[question.id]:option.id}))} className={`w-full rounded-lg border p-4 text-left transition ${answers[question.id]===option.id?"border-orange-500 bg-orange-50 dark:bg-orange-950/30":"border-gray-200 hover:border-orange-300 dark:border-gray-800"}`}><b className="mr-3 text-orange-600">{option.id}.</b>{option.text}</button>)}</div><div className="mt-8 flex items-center justify-between"><button disabled={current===0} onClick={()=>setCurrent(n=>n-1)} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-semibold disabled:opacity-40"><ChevronLeft className="h-4 w-4"/> Trước</button>{current===exam.questions.length-1?<button onClick={()=>setSubmitted(true)} className="rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-white hover:bg-orange-600">Nộp bài</button>:<button onClick={()=>setCurrent(n=>n+1)} className="inline-flex items-center gap-1 rounded-lg bg-gray-900 px-4 py-2.5 font-semibold text-white dark:bg-white dark:text-gray-900">Tiếp <ChevronRight className="h-4 w-4"/></button>}</div></section>;
}
