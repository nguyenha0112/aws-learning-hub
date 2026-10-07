"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "@/components/LanguageProvider";

const vietnameseCharacters = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

function chooseHeadingLanguage(line: string, locale: "vi" | "en") {
  const match = line.match(/^(#{1,6}\s+)(.+?)\s+\(([^()]+)\)$/);
  if (!match) return line;
  const [, prefix, first, second] = match;
  const firstIsVietnamese = vietnameseCharacters.test(first);
  const secondIsVietnamese = vietnameseCharacters.test(second);
  if (locale === "en") return prefix + (firstIsVietnamese && !secondIsVietnamese ? second : first);
  return prefix + (firstIsVietnamese || !secondIsVietnamese ? first : second);
}

function selectLanguage(markdown: string, locale: "vi" | "en") {
  return markdown
    .split("\n")
    .filter(line => {
      const isVietnameseLine = /^\s*[*-]\s+\*\*VN:\*\*/.test(line);
      const isEnglishLine = /^\s*[*-]\s+\*\*EN:\*\*/.test(line);
      return locale === "vi" ? !isEnglishLine : !isVietnameseLine;
    })
    .map(line => line.replace(/^(\s*[*-]\s+)\*\*(?:VN|EN):\*\*\s*/, "$1"))
    .map(line => chooseHeadingLanguage(line, locale))
    .join("\n");
}

export function LocalizedMarkdown({ markdown }: { markdown: string }) {
  const { locale } = useLanguage();
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ h1: ({ children }) => <h2>{children}</h2> }}>{selectLanguage(markdown, locale)}</ReactMarkdown>;
}
