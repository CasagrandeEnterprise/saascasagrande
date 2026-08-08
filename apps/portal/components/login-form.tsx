"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { authenticate, type LoginState } from "@/app/login/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-xl bg-copper-500 px-4 py-3 text-sm font-semibold text-ink-950 transition hover:bg-copper-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Entrando…" : "Entrar"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink-200">E-mail</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={160}
          className="rounded-xl border border-ink-600 bg-ink-950/60 px-3.5 py-2.5 text-ink-50 outline-none transition placeholder:text-ink-400 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30"
          placeholder="voce@empresa.com"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-ink-200">Senha</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={200}
          className="rounded-xl border border-ink-600 bg-ink-950/60 px-3.5 py-2.5 text-ink-50 outline-none transition placeholder:text-ink-400 focus:border-copper-500 focus:ring-2 focus:ring-copper-500/30"
          placeholder="••••••••"
        />
      </label>

      {state?.error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
