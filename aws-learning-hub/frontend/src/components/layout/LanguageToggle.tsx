"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  return <div className="flex items-center rounded-lg border border-slate-200 p-0.5 text-xs font-extrabold dark:border-white/10"><Languages className="mx-1 h-3.5 w-3.5 text-slate-400" /><button type="button" onClick={() => setLocale("vi")} className={`rounded-md px-1.5 py-1 transition ${locale === "vi" ? "bg-orange-500 text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>VI</button><button type="button" onClick={() => setLocale("en")} className={`rounded-md px-1.5 py-1 transition ${locale === "en" ? "bg-orange-500 text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>EN</button></div>;
}
