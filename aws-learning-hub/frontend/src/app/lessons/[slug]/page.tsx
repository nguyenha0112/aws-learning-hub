import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";

// Read the generated JSON directly since it's a server component
import contentIndex from "@/data/content-index.json";

export async function generateStaticParams() {
  return contentIndex.lessons.map((lesson) => ({
    slug: lesson.id,
  }));
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = contentIndex.lessons.find((l) => l.id === params.slug);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
          {lesson.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 px-2 py-1 rounded">
            {lesson.domain}
          </span>
          <span>{lesson.duration_minutes} phút</span>
          <span>{lesson.level}</span>
        </div>
      </div>

      {lesson.video_url && (
        <div className="mb-10 aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
          <iframe
            src={lesson.video_url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {lesson.markdown}
        </ReactMarkdown>
      </article>

      {lesson.quiz && (
        <div className="mt-12 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <h3 className="text-xl font-bold mb-4">Bài Tập Kiểm Tra (Quiz)</h3>
          <p className="font-medium mb-4">{lesson.quiz.question}</p>
          <div className="space-y-2">
            {lesson.quiz.options.map((opt: any, idx: number) => (
              <div
                key={idx}
                className="p-3 rounded border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
              >
                {opt.text}
              </div>
            ))}
          </div>
          {/* Note: In reality, Quiz state (selected, reveal correct, explanation) needs a Client Component. We will refactor this to a Quiz component later. */}
        </div>
      )}
    </div>
  );
}
