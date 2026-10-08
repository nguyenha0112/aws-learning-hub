"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { LanguageProvider } from "./LanguageProvider";
import { LearningProgressProvider } from "./LearningProgressProvider";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}><LanguageProvider><LearningProgressProvider>{children}</LearningProgressProvider></LanguageProvider></NextThemesProvider>;
}
