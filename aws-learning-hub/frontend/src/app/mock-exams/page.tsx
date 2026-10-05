import mockExams from "@/data/mock-exam.json";
import { MockExam } from "@/components/exam/MockExam";
export default function MockExamsPage(){const exam=mockExams.exams[0];return <div className="mx-auto max-w-3xl"><p className="mb-2 text-sm font-bold tracking-[0.16em] text-orange-600">PRACTICE TEST</p><MockExam exam={exam}/></div>}
