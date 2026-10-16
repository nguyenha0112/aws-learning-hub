"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type RecallLevel = "familiar" | "solid" | "mastered";
export type ReviewItem = { lessonId: string; level: RecallLevel; dueDate: string; updatedAt: string };
export type PersonalTodo = { id: string; text: string; dueDate: string; completed: boolean; createdAt: string };
export type VocabularyCard = { id: string; term: string; definition: string; grammar: string; note: string; example: string; level: RecallLevel; dueDate: string; createdAt: string; updatedAt: string };
type ProgressContextValue = { completedIds: string[]; lastLessonId: string | null; reviews: ReviewItem[]; todos: PersonalTodo[]; vocabulary: VocabularyCard[]; toggleCompleted: (lessonId: string) => void; setLastLesson: (lessonId: string) => void; isCompleted: (lessonId: string) => boolean; rateRecall: (lessonId: string, level: RecallLevel) => void; addTodo: (text: string, dueDate?: string) => void; toggleTodo: (id: string) => void; removeTodo: (id: string) => void; addVocabulary: (card: Pick<VocabularyCard, "term" | "definition" | "grammar" | "note" | "example">) => void; rateVocabulary: (id: string, level: RecallLevel) => void; removeVocabulary: (id: string) => void; };

const ProgressContext = createContext<ProgressContextValue | null>(null);
const completedCookie = "aws-learning-completed";
const lastLessonCookie = "aws-learning-last-lesson";
const reviewsCookie = "aws-learning-reviews-v1";
const todosCookie = "aws-learning-todos-v1";
const vocabularyCookie = "aws-learning-vocabulary-v1";
function getCookie(name: string) { if (typeof document === "undefined") return ""; return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1] ?? ""; }
function readJson<T>(name: string, fallback: T) { try { const raw = decodeURIComponent(getCookie(name)); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; } }
function dayKey(date = new Date()) { return date.toISOString().slice(0, 10); }
function dateAfter(days: number) { const date = new Date(); date.setDate(date.getDate() + days); return dayKey(date); }
function writeCookie(name: string, value: string) { document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`; }

export function LearningProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>(() => decodeURIComponent(getCookie(completedCookie)).split(",").filter(Boolean));
  const [lastLessonId, setLastLessonId] = useState<string | null>(() => decodeURIComponent(getCookie(lastLessonCookie)) || null);
  const [reviews, setReviews] = useState<ReviewItem[]>(() => readJson(reviewsCookie, []));
  const [todos, setTodos] = useState<PersonalTodo[]>(() => readJson(todosCookie, []));
  const [vocabulary, setVocabulary] = useState<VocabularyCard[]>(() => readJson(vocabularyCookie, []));
  useEffect(() => { writeCookie(completedCookie, completedIds.join(",")); }, [completedIds]);
  useEffect(() => { writeCookie(reviewsCookie, JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { writeCookie(todosCookie, JSON.stringify(todos)); }, [todos]);
  useEffect(() => { writeCookie(vocabularyCookie, JSON.stringify(vocabulary)); }, [vocabulary]);

  const value = useMemo<ProgressContextValue>(() => ({
    completedIds, lastLessonId, reviews, todos, vocabulary,
    toggleCompleted: (lessonId) => setCompletedIds(current => current.includes(lessonId) ? current.filter(id => id !== lessonId) : [...current, lessonId]),
    setLastLesson: (lessonId) => { setLastLessonId(lessonId); writeCookie(lastLessonCookie, lessonId); },
    isCompleted: (lessonId) => completedIds.includes(lessonId),
    rateRecall: (lessonId, level) => { const interval = level === "familiar" ? 1 : level === "solid" ? 4 : 14; const next: ReviewItem = { lessonId, level, dueDate: dateAfter(interval), updatedAt: new Date().toISOString() }; setReviews(current => [...current.filter(item => item.lessonId !== lessonId), next]); },
    addTodo: (text, dueDate = dayKey()) => { const trimmed = text.trim(); if (!trimmed) return; setTodos(current => [...current, { id: crypto.randomUUID(), text: trimmed, dueDate, completed: false, createdAt: new Date().toISOString() }]); },
    toggleTodo: (id) => setTodos(current => current.map(item => item.id === id ? { ...item, completed: !item.completed } : item)),
    removeTodo: (id) => setTodos(current => current.filter(item => item.id !== id)),
    addVocabulary: (card) => { const term = card.term.trim(); const definition = card.definition.trim(); if (!term || !definition) return; const now = new Date().toISOString(); setVocabulary(current => [...current, { id: crypto.randomUUID(), term, definition, grammar: card.grammar.trim(), note: card.note.trim(), example: card.example.trim(), level: "familiar", dueDate: dateAfter(1), createdAt: now, updatedAt: now }]); },
    rateVocabulary: (id, level) => { const interval = level === "familiar" ? 1 : level === "solid" ? 4 : 14; setVocabulary(current => current.map(card => card.id === id ? { ...card, level, dueDate: dateAfter(interval), updatedAt: new Date().toISOString() } : card)); },
    removeVocabulary: (id) => setVocabulary(current => current.filter(card => card.id !== id)),
  }), [completedIds, lastLessonId, reviews, todos, vocabulary]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useLearningProgress() { const value = useContext(ProgressContext); if (!value) throw new Error("useLearningProgress must be used inside LearningProgressProvider"); return value; }
