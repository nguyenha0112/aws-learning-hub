"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AIProviderName = "openrouter" | "groq";
export type AISettings = { provider: AIProviderName; model: string; temperature: number; maxTokens: number; apiKey: string };
type AIContextValue = { settings: AISettings; configured: boolean; save: (settings: AISettings) => void; clearKey: () => void };
const defaults: AISettings = { provider: "openrouter", model: "openai/gpt-4.1-mini", temperature: 0.35, maxTokens: 700, apiKey: "" };
const AIContext = createContext<AIContextValue | null>(null);
const storageKey = "aws-learning-ai-settings-v1";

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(defaults);
  useEffect(() => { try { const raw = sessionStorage.getItem(storageKey); if (raw) setSettings({ ...defaults, ...JSON.parse(raw) }); } catch {} }, []);
  const save = (next: AISettings) => { setSettings(next); try { sessionStorage.setItem(storageKey, JSON.stringify(next)); } catch {} };
  const clearKey = () => save({ ...settings, apiKey: "" });
  const value = useMemo(() => ({ settings, configured: Boolean(settings.apiKey.trim()), save, clearKey }), [settings]);
  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}
export function useAI() { const value = useContext(AIContext); if (!value) throw new Error("useAI must be used inside AIProvider"); return value; }

export async function requestAIExplanation(settings: AISettings, prompt: string) {
  const endpoint = settings.provider === "groq" ? "https://api.groq.com/openai/v1/chat/completions" : "https://openrouter.ai/api/v1/chat/completions";
  const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${settings.apiKey}`, "Content-Type": "application/json", ...(settings.provider === "openrouter" ? { "HTTP-Referer": window.location.origin, "X-Title": "AWS Learning Hub" } : {}) }, body: JSON.stringify({ model: settings.model, temperature: settings.temperature, max_tokens: settings.maxTokens, messages: [{ role: "system", content: "You are a precise AWS learning tutor. Explain in the learner's language. Do not reveal the answer before teaching the reasoning. Keep it concise and use AWS exam terminology accurately." }, { role: "user", content: prompt }] }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error?.message || `Provider returned ${response.status}`);
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("AI provider returned no text response.");
  return content;
}
