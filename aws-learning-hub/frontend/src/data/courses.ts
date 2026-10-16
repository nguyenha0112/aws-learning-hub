export type Course = {
  id: string;
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  badge: string;
  status: "available" | "coming-soon";
  accent: "orange" | "sky" | "violet";
};

export const courses: Course[] = [
  {
    id: "aws-cloud-practitioner",
    title: { vi: "AWS Cloud Practitioner", en: "AWS Cloud Practitioner" },
    description: { vi: "Nền tảng AWS, dịch vụ cốt lõi, bảo mật, giá và đề CLF-C02.", en: "AWS foundations, core services, security, pricing, and CLF-C02 practice." },
    badge: "CLF-C02",
    status: "available",
    accent: "orange",
  },
  {
    id: "english-for-cloud-it",
    title: { vi: "Tiếng Anh cho Cloud & IT", en: "English for Cloud & IT" },
    description: { vi: "Từ vựng, đọc tài liệu kỹ thuật và giao tiếp cho kỹ sư cloud.", en: "Vocabulary, technical reading, and communication for cloud engineers." },
    badge: "VOCABULARY",
    status: "available",
    accent: "sky",
  },
  {
    id: "toeic-vocabulary",
    title: { vi: "TOEIC Vocabulary", en: "TOEIC Vocabulary" },
    description: { vi: "Từ vựng TOEIC, nghĩa, từ loại, ví dụ và flashcard theo nhịp ôn khó/bình thường/dễ.", en: "TOEIC vocabulary, definitions, parts of speech, examples, and difficulty-based flashcards." },
    badge: "TOEIC",
    status: "available",
    accent: "violet",
  },
  {
    id: "aws-solutions-architect-associate",
    title: { vi: "AWS Solutions Architect Associate", en: "AWS Solutions Architect Associate" },
    description: { vi: "Thiết kế kiến trúc AWS và ôn chứng chỉ SAA-C03 theo scenario.", en: "AWS architecture design and scenario-based SAA-C03 preparation." },
    badge: "SAA-C03",
    status: "coming-soon",
    accent: "violet",
  },
];

export function getCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}
