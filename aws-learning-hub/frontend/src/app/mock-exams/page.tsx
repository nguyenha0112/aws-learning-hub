import mockExams from "@/data/mock-exams.json";
import { MockExamLibrary } from "@/components/exam/MockExam";

export default function MockExamsPage() {
  return <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6"><MockExamLibrary exams={mockExams.exams} /></main>;
}
