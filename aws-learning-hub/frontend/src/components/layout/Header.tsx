import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            AWS Learning Hub
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-3 text-sm font-medium md:gap-6">
            <Link href="/lessons" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
              Bài Học
            </Link>
            <Link href="/mock-exams" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors">
              Mock Exam
            </Link>
          </nav>
          <div className="flex items-center border-l border-gray-200 dark:border-gray-800 pl-3 md:pl-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
