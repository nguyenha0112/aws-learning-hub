import React from "react";
import Link from "next/link";
import contentIndex from "@/data/content-index.json";

export default function LessonsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-8">
        Danh sách bài học
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentIndex.lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
            className="group block p-6 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/30 px-2 py-1 rounded">
                {lesson.domain}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-orange-500 transition-colors">
              {lesson.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{lesson.duration_minutes} phút</span>
              <span>{lesson.level}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
