import { notFound } from "next/navigation";
import { LessonCatalog } from "@/components/lesson/LessonCatalog";
import { getCourse } from "@/data/courses";
import { VocabularyNotebook } from "@/components/vocabulary/VocabularyNotebook";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  if (!getCourse(courseId)) notFound();
  if (courseId === "toeic-vocabulary") return <VocabularyNotebook track="toeic" />;
  return <LessonCatalog courseId={courseId} />;
}
