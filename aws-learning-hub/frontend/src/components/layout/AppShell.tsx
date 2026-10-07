"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLessonDetail = pathname.startsWith("/lessons/");
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className={`flex min-w-0 gap-8 ${isLessonDetail ? "md:flex-row" : ""}`}>{isLessonDetail && <Sidebar />}<main className={`min-w-0 flex-1 py-6 lg:py-10 ${isLessonDetail ? "" : "mx-auto max-w-6xl"}`}>{children}</main></div></div>;
}
