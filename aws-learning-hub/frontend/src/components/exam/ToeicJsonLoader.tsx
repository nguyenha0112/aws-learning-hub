"use client";

import { useRef, useState } from "react";
import { FileJson, Upload, Sparkles, AlertCircle } from "lucide-react";
import { MockExamLibrary, type Exam } from "@/components/exam/MockExam";

type ToeicQuestion = {
  id: number;
  question: string;
  choices: Record<"A" | "B" | "C" | "D", string>;
  answer: "A" | "B" | "C" | "D";
  translation?: string;
  type?: string;
  key_words?: string;
  form?: string;
  vocabulary?: Record<string, string>;
  explanation: string;
};

type ToeicDocument = { title?: string; questions?: ToeicQuestion[] };

const toTip = (item: ToeicQuestion) => {
  const words = item.vocabulary ? Object.entries(item.vocabulary).map(([word, meaning]) => `${word}: ${meaning}`).join(" · ") : "";
  return [item.type && `Dạng: ${item.type}`, item.key_words && `Từ khóa: ${item.key_words}`, item.form && `Công thức: ${item.form}`, words && `Từ vựng: ${words}`].filter(Boolean).join("\n");
};

const toExam = (source: ToeicDocument): Exam => ({
  id: "toeic-part5-imported",
  title: source.title || "TOEIC Part 5 Practice",
  certification: "TOEIC Part 5",
  duration_minutes: Math.max(15, (source.questions?.length ?? 0) * 0.75),
  passing_score: 80,
  question_count: source.questions?.length ?? 0,
  source_quality: "verified",
  questions: (source.questions ?? []).map((item) => ({
    id: String(item.id),
    domain: ["TOEIC PART 5", item.type].filter(Boolean).join(" · "),
    question: item.question,
    options: (["A", "B", "C", "D"] as const).map((id) => ({ id, text: item.choices[id] })),
    correct_option: item.answer,
    explanation: [item.explanation, item.translation && `Dịch nghĩa: ${item.translation}`].filter(Boolean).join("\n\n"),
    tip: toTip(item),
  })),
});

export function ToeicJsonLoader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [error, setError] = useState<string | null>(null);

  const importFile = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as ToeicDocument;
      if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) throw new Error("Không tìm thấy mảng questions.");
      const invalid = parsed.questions.find((question) => !question.question || !question.choices || !question.answer || !question.explanation);
      if (invalid) throw new Error(`Câu ${invalid.id ?? "không rõ"} thiếu question, choices, answer hoặc explanation.`);
      setExam(toExam(parsed));
      setError(null);
    } catch (cause) {
      setExam(null);
      setError(cause instanceof Error ? cause.message : "Không thể đọc file JSON này.");
    }
  };

  if (exam) return <MockExamLibrary exams={[exam]} />;

  return (
    <section className="mx-auto max-w-3xl py-5">
      <div className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-7 shadow-sm dark:border-indigo-400/20 dark:from-indigo-950/30 dark:via-[#111520] dark:to-[#111520] sm:p-10">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"><FileJson className="h-6 w-6" /></div>
        <p className="mt-6 text-xs font-extrabold tracking-[.18em] text-indigo-600 dark:text-indigo-300">TOEIC PART 5 · IMPORT EXAM</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Mở đề JSON và bắt đầu làm bài.</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">Trang sẽ đọc đề ngay trên trình duyệt. Dữ liệu đề không được gửi lên máy chủ; sau khi nạp, bạn có thể thi mô phỏng hoặc luyện tập có giải thích, dịch nghĩa và từ vựng.</p>

        <input ref={inputRef} type="file" accept="application/json,.json" className="hidden" onChange={(event) => void importFile(event.target.files?.[0])} />
        <button onClick={() => inputRef.current?.click()} className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 font-extrabold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"><Upload className="h-4 w-4" />Chọn file đề JSON</button>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Chọn file <b>toeic_part5_study4_101_130.json</b> trong thư mục Downloads của bạn.</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {[["01", "Thi mô phỏng", "Đáp án ẩn đến khi nộp bài, có đồng hồ."], ["02", "Luyện tập", "Chọn là xem ngay đáp án, giải thích và mẹo."], ["03", "Ôn lại", "Kết quả hiển thị toàn bộ câu sai để xem lại."]].map(([number, title, description]) => <article key={number} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#111520]"><p className="text-xs font-black tracking-[.18em] text-indigo-600">{number}</p><h2 className="mt-2 font-black">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p></article>)}
      </div>

      {error && <p className="mt-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200"><AlertCircle className="h-4 w-4" />{error}</p>}
      <p className="mt-7 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Sparkles className="h-4 w-4 text-indigo-500" />Hỗ trợ cấu trúc câu hỏi gồm: choices A–D, answer, translation, vocabulary và explanation.</p>
    </section>
  );
}
