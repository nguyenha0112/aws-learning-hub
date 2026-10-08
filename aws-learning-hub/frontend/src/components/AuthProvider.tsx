"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseClient, type Profile } from "@/lib/supabase";

type AuthContextValue = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseClient();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setProfile(null); return; }
    const { data } = await supabase.from("profiles").select("id,email,role,created_at").eq("id", user.id).maybeSingle();
    setProfile(data as Profile | null);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    let active = true;
    supabase.auth.getSession().then(({ data: { session: nextSession } }) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
      if (nextSession) void refreshProfile();
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) void refreshProfile(); else setProfile(null);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, [refreshProfile, supabase]);

  const signIn = async (email: string, password: string) => {
    if (!supabase) return "Supabase chưa được cấu hình. Kiểm tra .env ở thư mục gốc.";
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  };
  const signUp = async (email: string, password: string) => {
    if (!supabase) return "Supabase chưa được cấu hình. Kiểm tra .env ở thư mục gốc.";
    const { error } = await supabase.auth.signUp({ email, password });
    return error?.message ?? null;
  };
  const signOut = async () => { if (supabase) await supabase.auth.signOut(); };

  const value = useMemo(() => ({ session, profile, loading, configured: Boolean(supabase), signIn, signUp, signOut, refreshProfile }), [loading, profile, session, supabase, refreshProfile]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
