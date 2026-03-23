"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await signIn("credentials", {
        emailOrUsername,
        password,
        redirect: false
      });

      if (result?.error) {
        const message =
          result.error === "CredentialsSignin"
            ? "Invalid email, username, or password"
            : "Unable to sign in";

        toast.error(message);
        return;
      }

      toast.success("Signed in successfully");
      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Email or username
        </label>
        <input
          className="w-full rounded-[1.35rem] border-2 border-[var(--line)] bg-[#fff5ee] px-4 py-3 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 focus:border-[#ffb9a7]"
          name="emailOrUsername"
          type="text"
          value={emailOrUsername}
          onChange={(event) => setEmailOrUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Password</label>
        <input
          className="w-full rounded-[1.35rem] border-2 border-[var(--line)] bg-[#fff5ee] px-4 py-3 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 focus:border-[#ffb9a7]"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-[1.35rem] border-2 border-[var(--line)] bg-[#ffb9a7] px-4 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-center text-sm text-[var(--muted)]">
        Need an account?{" "}
        <Link href="/sign-up" className="font-extrabold text-[#b45e40]">
          Sign up
        </Link>
      </p>
    </form>
  );
}
