"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { LanguageProvider } from "./LanguageProvider";
import { LearningProgressProvider } from "./LearningProgressProvider";
import { AuthProvider } from "./AuthProvider";
import { AIProvider } from "./ai/AIProvider";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}><LanguageProvider><AuthProvider><AIProvider><LearningProgressProvider>{children}</LearningProgressProvider></AIProvider></AuthProvider></LanguageProvider></NextThemesProvider>;
}
