"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLessonDetail = pathname.startsWith("/lessons/");
  const isExam = pathname === "/toeic-test" || pathname === "/mock-exams";
  return <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isExam ? "max-w-[1600px]" : "max-w-7xl"}`}><div className={`flex min-w-0 gap-8 ${isLessonDetail ? "md:flex-row" : ""}`}>{isLessonDetail && <Sidebar />}<main className={`min-w-0 flex-1 py-6 lg:py-10 ${isLessonDetail || isExam ? "" : "mx-auto max-w-6xl"}`}>{children}</main></div></div>;
}
