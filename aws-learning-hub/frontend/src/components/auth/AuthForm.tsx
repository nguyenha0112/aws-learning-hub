"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export function AuthForm() {
  const { signIn, signUp, configured } = useAuth();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setSubmitting(true); setMessage(null);
    const error = mode === "signIn" ? await signIn(email, password) : await signUp(email, password);
    setMessage(error ?? (mode === "signUp" ? "Đăng ký thành công. Hãy xác thực email nếu Supabase yêu cầu." : "Đăng nhập thành công."));
    setSubmitting(false);
  }
  return <form onSubmit={submit} className="mx-auto mt-8 max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 dark:border-white/10 dark:bg-[#111520] dark:shadow-none">
    <div className="mb-6 flex rounded-xl bg-slate-100 p-1 dark:bg-white/5"><button type="button" onClick={() => setMode("signIn")} className={`flex-1 rounded-lg py-2 text-sm font-bold ${mode === "signIn" ? "bg-white text-slate-950 shadow-sm dark:bg-white/15 dark:text-white" : "text-slate-500"}`}>Đăng nhập</button><button type="button" onClick={() => setMode("signUp")} className={`flex-1 rounded-lg py-2 text-sm font-bold ${mode === "signUp" ? "bg-white text-slate-950 shadow-sm dark:bg-white/15 dark:text-white" : "text-slate-500"}`}>Tạo tài khoản</button></div>
    <label className="block text-sm font-bold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 outline-none focus:border-orange-500 dark:border-white/15" /></label>
    <label className="mt-4 block text-sm font-bold">Mật khẩu<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-transparent px-3 py-2.5 outline-none focus:border-orange-500 dark:border-white/15" /></label>
    {message && <p className="mt-4 rounded-xl bg-orange-50 p-3 text-sm text-orange-800 dark:bg-orange-500/10 dark:text-orange-200">{message}</p>}
    <button disabled={!configured || submitting} className="mt-5 w-full rounded-xl bg-orange-600 py-3 font-extrabold text-white transition hover:bg-orange-500 disabled:opacity-50">{submitting ? "Đang xử lý..." : mode === "signIn" ? "Đăng nhập" : "Tạo tài khoản"}</button>
  </form>;
}
