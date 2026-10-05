import Link from "next/link";
import { BookMarked, ChevronRight, Layers3 } from "lucide-react";
import contentIndex from "@/data/content-index.json";

const categories = Object.entries(
  contentIndex.lessons.reduce<Record<string, typeof contentIndex.lessons>>((groups, lesson) => {
    (groups[lesson.domain] ??= []).push(lesson);
    return groups;
  }, {}),
);

export function Sidebar() {
  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-64 shrink-0 overflow-y-auto pr-2 md:block">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mb-3 flex items-center gap-2 px-2 pt-1">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"><BookMarked className="h-4 w-4" /></span>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-900 dark:text-white">Thư viện học</p>
            <p className="text-[11px] text-slate-500">{contentIndex.lessons.length} bài học</p>
          </div>
        </div>
        {categories.map(([domain, lessons]) => (
          <div key={domain} className="pb-4 last:pb-1">
            <h4 className="mb-1.5 flex items-center gap-1.5 px-2 text-[11px] font-bold uppercase tracking-[0.13em] text-slate-400 dark:text-slate-500">
              <Layers3 className="h-3.5 w-3.5" /> {domain}
            </h4>
            <div className="flex w-full flex-col gap-0.5 text-sm">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="group flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium leading-5 text-slate-600 transition hover:bg-orange-50 hover:text-orange-800 dark:text-slate-300 dark:hover:bg-orange-500/10 dark:hover:text-orange-200"
                >
                  <span>{lesson.title}</span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
