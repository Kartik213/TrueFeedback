"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    emailOrUsername: false,
    password: false
  });

  const trimmedIdentifier = emailOrUsername.trim();
  const identifierLooksLikeEmail = trimmedIdentifier.includes("@");
  const identifierError =
    !trimmedIdentifier
      ? "Email or username is required."
      : identifierLooksLikeEmail && !isValidEmail(trimmedIdentifier)
        ? "Enter a valid email address or use your username."
        : "";
  const passwordError = !password ? "Password is required." : "";
  const canSubmit = !identifierError && !passwordError;
  const showIdentifierError =
    (touched.emailOrUsername || hasSubmitted) && !!identifierError;
  const showPasswordError = (touched.password || hasSubmitted) && !!passwordError;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setTouched({
      emailOrUsername: true,
      password: true
    });

    if (!canSubmit) {
      toast.error(identifierError || passwordError);
      return;
    }

    startTransition(async () => {
      const result = await signIn("credentials", {
        emailOrUsername: trimmedIdentifier,
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
          className={`w-full rounded-[1.35rem] border-2 bg-[#fff5ee] px-4 py-2 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 ${
            showIdentifierError
              ? "border-[#d97b6c]"
              : "border-[var(--line)] focus:border-[#ffb9a7]"
          }`}
          name="emailOrUsername"
          type="text"
          value={emailOrUsername}
          onChange={(event) => setEmailOrUsername(event.target.value)}
          onBlur={() =>
            setTouched((current) => ({ ...current, emailOrUsername: true }))
          }
        />
        {showIdentifierError ? (
          <p className="mt-2 text-sm font-semibold text-[#b45e40]">{identifierError}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Password</label>
        <div className="relative">
          <input
            className={`w-full rounded-[1.35rem] border-2 bg-[#fff5ee] px-4 py-2 pr-14 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 ${
              showPasswordError
                ? "border-[#d97b6c]"
                : "border-[var(--line)] focus:border-[#ffb9a7]"
            }`}
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setTouched((current) => ({ ...current, password: true }))}
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] transition hover:text-[var(--ink)]"
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        {showPasswordError ? (
          <p className="mt-2 text-sm font-semibold text-[#b45e40]">{passwordError}</p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isPending || !canSubmit}
        aria-disabled={isPending || !canSubmit}
        className={`w-full rounded-[1.35rem] border-2 px-4 py-3 text-sm font-extrabold uppercase tracking-[0.16em] transition ${
          isPending || !canSubmit
            ? "cursor-not-allowed border-[#d8d0bc] bg-[#f6d9cf] text-[#9a7e74] shadow-none"
            : "border-[var(--line)] bg-[#ffb9a7] text-[var(--ink)] hover:-translate-y-0.5"
        }`}
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
