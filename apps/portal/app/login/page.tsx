import type { Metadata } from "next";
import { Layers } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login — Casagrande SaaS",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-in fade-in duration-500">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl font-semibold tracking-tight text-ink-50 sm:text-4xl">
            Casagrande
          </p>
          <p className="mt-2 text-sm text-ink-300">
            Acesse o portal para escolher o sistema
          </p>
        </div>

        <div className="rounded-2xl border border-ink-700/80 bg-ink-900/70 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-copper-500/15 text-copper-400">
              <Layers className="h-5 w-5" aria-hidden />
            </div>
            <h1 className="text-lg font-semibold text-ink-50">Entrar</h1>
            <p className="text-sm text-ink-400">
              Credenciais de administrador
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
