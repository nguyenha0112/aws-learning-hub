"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Database, Layers3, Network, Search, Server, ShieldCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import contentIndex from "@/data/content-index.json";
import { getCourse } from "@/data/courses";
import { useLanguage } from "@/components/LanguageProvider";
import { useLearningProgress } from "@/components/LearningProgressProvider";

const domainMeta: Record<string, { icon: typeof BookOpen; accent: string; tint: string }> = {
  Compute: { icon: Server, accent: "text-violet-600 dark:text-violet-300", tint: "from-violet-500/15 to-indigo-500/5" },
  Database: { icon: Database, accent: "text-teal-600 dark:text-teal-300", tint: "from-teal-500/15 to-cyan-500/5" },
  Networking: { icon: Network, accent: "text-sky-600 dark:text-sky-300", tint: "from-sky-500/15 to-blue-500/5" },
  Security: { icon: ShieldCheck, accent: "text-rose-600 dark:text-rose-300", tint: "from-rose-500/15 to-orange-500/5" },
};

export function LessonCatalog({ courseId = "aws-cloud-practitioner" }: { courseId?: string }) {
  const { t, locale } = useLanguage();
  const { completedIds, lastLessonId, isCompleted } = useLearningProgress();
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const course = getCourse(courseId);
  const lessons = contentIndex.lessons.filter((lesson) => lesson.course_id === courseId);
  const domains = [...new Set(lessons.map((lesson) => lesson.domain))];
  const visible = useMemo(() => lessons.filter((lesson) => {
    const matches = `${lesson.title} ${lesson.domain}`.toLowerCase().includes(query.toLowerCase());
    return matches && (domain === "all" || lesson.domain === domain);
  }), [domain, lessons, query]);
  const groups = Object.entries(visible.reduce<Record<string, typeof lessons>>((result, lesson) => {
    (result[lesson.domain] ??= []).push(lesson); return result;
  }, {}));
  const completed = lessons.filter((lesson) => completedIds.includes(lesson.id)).length;
  const progress = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;
  const nextLesson = lessons.find((lesson) => lesson.id === lastLessonId) ?? lessons.find((lesson) => !isCompleted(lesson.id));

  return <div className="space-y-8 pb-8">
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-[0_16px_50px_-32px_rgba(15,23,42,0.36)] dark:border-white/10 dark:bg-[#111520] sm:px-9 sm:py-10">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-400/15 blur-3xl" />
      <div className="relative max-w-3xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"><Sparkles className="h-3.5 w-3.5" /> {course?.badge ?? t("library")}</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{course?.title[locale] ?? t("chooseLesson")}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">{course?.description[locale] ?? t("libraryDescription")}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-2xl bg-slate-100/80 p-4 dark:bg-white/5">
            <div className="flex justify-between text-sm font-bold"><span>{locale === "vi" ? "Tiến độ khóa học" : "Course progress"}</span><span>{completed}/{lessons.length} · {progress}%</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500" style={{ width: `${progress}%` }} /></div>
          </div>
          {nextLesson && <Link href={`/lessons/${nextLesson.id}`} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white dark:bg-orange-500">{locale === "vi" ? "Học tiếp" : "Continue"}<ArrowRight className="h-4 w-4" /></Link>}
        </div>
      </div>
    </section>

    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111520]">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "vi" ? "Tìm lesson hoặc domain..." : "Search lessons or domains..."} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-orange-400 dark:border-white/10 dark:bg-white/5" /></label>
        <div className="flex flex-wrap gap-2"><button onClick={() => setDomain("all")} className={`rounded-lg px-3 py-2 text-xs font-bold ${domain === "all" ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-white/5"}`}>{locale === "vi" ? "Tất cả" : "All"}</button>{domains.map((item) => <button key={item} onClick={() => setDomain(item)} className={`rounded-lg px-3 py-2 text-xs font-bold ${domain === item ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-white/5"}`}>{item}</button>)}</div>
      </div>
    </section>

    {groups.map(([group, groupLessons]) => {
      const meta = domainMeta[group] ?? { icon: Layers3, accent: "text-orange-600 dark:text-orange-300", tint: "from-orange-500/15 to-amber-500/5" };
      const Icon = meta.icon;
      return <section key={group}><div className="mb-4 flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${meta.tint} ${meta.accent}`}><Icon className="h-5 w-5" /></span><div><h2 className="text-xl font-extrabold">{group}</h2><p className="text-sm text-slate-500">{groupLessons.length} {t("lessonsInGroup")}</p></div></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{groupLessons.map((lesson, index) => <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl dark:border-white/10 dark:bg-[#111520]"><div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${meta.tint.replace("/15", "").replace("/5", "")}`} /><div className="flex justify-between"><span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${meta.tint} ${meta.accent}`}><Icon className="h-4 w-4" /></span>{isCompleted(lesson.id) ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <span className="text-xs font-bold text-slate-400">{String(index + 1).padStart(2, "0")}</span>}</div><h3 className="mt-5 text-lg font-extrabold leading-6 group-hover:text-orange-600">{lesson.title}</h3><div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 dark:border-white/10"><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{lesson.duration_minutes} {t("minutes")}</span><span>{t("learn")} <ArrowRight className="inline h-3.5 w-3.5" /></span></div></Link>)}</div></section>;
    })}
    {!groups.length && <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">{locale === "vi" ? "Không tìm thấy lesson phù hợp." : "No matching lessons found."}</div>}
  </div>;
}
