import type { Metadata } from "next";
import { Building2 } from "lucide-react";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login — Painel Casagrande SaaS",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-100">
            <Building2 className="h-6 w-6 text-coffee-600" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">
            Casagrande SaaS
          </h1>
          <p className="text-sm text-slate-500">
            Painel de administração — acesso restrito
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
