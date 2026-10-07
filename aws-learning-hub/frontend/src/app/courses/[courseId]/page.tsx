import { notFound } from "next/navigation";
import { LessonCatalog } from "@/components/lesson/LessonCatalog";
import { getCourse } from "@/data/courses";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  if (!getCourse(courseId)) notFound();
  return <LessonCatalog courseId={courseId} />;
}
