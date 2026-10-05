import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { LessonQuiz } from "@/components/lesson/LessonQuiz";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Clock3, GraduationCap, Layers3, PlayCircle } from "lucide-react";

// Read the generated JSON directly since it's a server component
import contentIndex from "@/data/content-index.json";

export async function generateStaticParams() {
  return contentIndex.lessons.map((lesson) => ({
    slug: lesson.id,
  }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = contentIndex.lessons.find((l) => l.id === slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl pb-10">
      <div className="mb-5 flex items-center justify-between">
        <Link href="/lessons" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-300">
          <ArrowLeft className="h-4 w-4" /> Tất cả bài học
        </Link>
        <span className="hidden text-xs font-semibold text-slate-400 sm:inline">AWS Learning Hub / {lesson.domain}</span>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.32)] dark:border-white/10 dark:bg-gradient-to-br dark:from-[#141824] dark:to-[#0d1019] sm:px-9 sm:py-9">
        <div className="absolute -right-14 -top-16 h-48 w-48 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/15" />
        <div className="relative">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg shadow-orange-500/25"><Layers3 className="h-5 w-5" /></span>
            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-orange-700 dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-300">{lesson.domain}</span>
          </div>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">{lesson.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-orange-500" /> {lesson.duration_minutes} phút tập trung</span>
            <span className="inline-flex items-center gap-1.5"><BookOpenCheck className="h-4 w-4 text-orange-500" /> {lesson.level}</span>
            {lesson.quiz && <a href="#quiz" className="inline-flex items-center gap-1.5 text-orange-700 transition hover:text-orange-800 dark:text-orange-300"><GraduationCap className="h-4 w-4" /> Có quiz cuối bài</a>}
          </div>
        </div>
      </section>

      {lesson.video_url && (
        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-xl dark:border-white/10">
          <div className="flex items-center gap-2 border-b border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white"><PlayCircle className="h-4 w-4 text-orange-400" /> Video bài học</div>
          <div className="aspect-video">
          <iframe
            src={lesson.video_url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          </div>
        </div>
      )}

      <article className="lesson-prose prose mt-7 max-w-none rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-[0_16px_50px_-32px_rgba(15,23,42,0.28)] dark:prose-invert dark:border-white/10 dark:bg-[#111520] sm:px-10 sm:py-10">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h2>{children}</h2>,
          }}
        >
          {lesson.markdown}
        </ReactMarkdown>
      </article>

      {lesson.quiz && (
        <div id="quiz" className="scroll-mt-24"><LessonQuiz quiz={lesson.quiz} /></div>
      )}
    </div>
  );
}
