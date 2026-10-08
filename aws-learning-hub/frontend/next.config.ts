import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import path from "path";

// Keep the real .env at the repository root (outside frontend). Only the
// Supabase URL and publishable key are exposed to the browser; the secret key
// is never included in this configuration.
loadEnvConfig(path.resolve(process.cwd(), ".."));

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY,
  },
};

export default nextConfig;
