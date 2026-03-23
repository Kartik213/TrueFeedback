"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "react-toastify";

type RegisterResponse = {
  message: string;
};

export function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      const data = (await response.json()) as RegisterResponse;

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.push("/sign-in");
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Username</label>
        <input
          className="w-full rounded-[1.35rem] border-2 border-[var(--line)] bg-[#f7ffef] px-4 py-3 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 focus:border-[#ffcf83]"
          value={formState.username}
          onChange={(event) =>
            setFormState((current) => ({ ...current, username: event.target.value }))
          }
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Email</label>
        <input
          className="w-full rounded-[1.35rem] border-2 border-[var(--line)] bg-[#f7ffef] px-4 py-3 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 focus:border-[#ffcf83]"
          type="email"
          value={formState.email}
          onChange={(event) =>
            setFormState((current) => ({ ...current, email: event.target.value }))
          }
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Password</label>
        <input
          className="w-full rounded-[1.35rem] border-2 border-[var(--line)] bg-[#f7ffef] px-4 py-3 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 focus:border-[#ffcf83]"
          type="password"
          value={formState.password}
          onChange={(event) =>
            setFormState((current) => ({ ...current, password: event.target.value }))
          }
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-[1.35rem] border-2 border-[var(--line)] bg-[#fff0a8] px-4 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Sign up"}
      </button>
      <p className="text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-extrabold text-[#5f8f6c]">
          Sign in
        </Link>
      </p>
    </form>
  );
}
