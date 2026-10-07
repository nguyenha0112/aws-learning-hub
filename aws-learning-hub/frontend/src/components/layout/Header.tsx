"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { BookOpen, FileText, GraduationCap } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#090b12]/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:-rotate-3">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-lg">
            AWS Learning Hub
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="flex items-center gap-1 text-sm font-semibold">
            <Link href="/" className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white sm:px-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t("lessons")}</span>
            </Link>
            <Link href="/mock-exams" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-2 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-400 sm:px-3">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">{t("exam")}</span>
            </Link>
          </nav>
          <div className="flex items-center gap-2 border-l border-slate-200 pl-2 dark:border-white/10 sm:pl-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
