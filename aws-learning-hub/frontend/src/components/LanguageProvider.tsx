"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "vi" | "en";
type TranslationKey = keyof typeof copy.vi;

const copy = {
  vi: {
    lessons: "Bài học", exam: "Làm đề", library: "THƯ VIỆN HỌC AWS", chooseLesson: "Chọn một bài học để bắt đầu.",
    libraryDescription: "Mỗi card là một lesson độc lập: kiến thức cốt lõi, scenario, lab an toàn và knowledge check sau từng phần.",
    lessonCount: "bài học", certification: "Cloud Practitioner · CLF-C02", lessonsInGroup: "bài học trong nhóm này", learn: "Học bài", minutes: "phút",
    knowledgeCheck: "KIỂM TRA KIẾN THỨC", checkNow: "Kiểm tra ngay", question: "câu hỏi", correct: "Chính xác!", incorrect: "Chưa đúng — hãy xem đáp án được tô xanh.", retry: "Làm lại câu này",
    sectionCheck: "KIỂM TRA THEO PHẦN", reinforce: "Củng cố", questions: "câu", score: "Bạn đúng", redo: "Làm lại phần này",
  },
  en: {
    lessons: "Lessons", exam: "Practice exam", library: "AWS STUDY LIBRARY", chooseLesson: "Choose a lesson to begin.",
    libraryDescription: "Every card is a standalone lesson with core concepts, scenarios, safe labs, and a knowledge check after each section.",
    lessonCount: "lessons", certification: "Cloud Practitioner · CLF-C02", lessonsInGroup: "lessons in this group", learn: "Study lesson", minutes: "min",
    knowledgeCheck: "KNOWLEDGE CHECK", checkNow: "Check your knowledge", question: "question", correct: "Correct!", incorrect: "Not quite — review the answer highlighted in green.", retry: "Try this question again",
    sectionCheck: "SECTION KNOWLEDGE CHECK", reinforce: "Review", questions: "questions", score: "You got", redo: "Retry this section",
  },
} as const;

type LanguageContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: TranslationKey) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

function getStoredLocale(): Locale {
  if (typeof document === "undefined") return "vi";
  const cookieLocale = document.cookie.match(/(?:^|; )aws-learning-locale=(vi|en)(?:;|$)/)?.[1];
  if (cookieLocale === "vi" || cookieLocale === "en") return cookieLocale;
  try {
    const stored = window.localStorage.getItem("aws-learning-locale");
    if (stored === "vi" || stored === "en") return stored;
  } catch { /* restricted browser storage */ }
  return "vi";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always begin with the server-rendered Vietnamese fallback. Reading browser
  // storage during the first client render caused a hydration mismatch when a
  // learner had previously selected English.
  const [locale, setLocale] = useState<Locale>("vi");
  useEffect(() => { setLocale(getStoredLocale()); }, []);
  useEffect(() => {
    document.cookie = `aws-learning-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
    try { window.localStorage.setItem("aws-learning-locale", locale); } catch { /* cookie is the fallback */ }
    document.documentElement.lang = locale;
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, t: (key: TranslationKey) => copy[locale][key] }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
