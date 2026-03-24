"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

type RegisterResponse = {
  message: string;
};

const usernamePattern = /^[A-Za-z0-9_]+$/;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getPasswordChecks(password: string) {
  return [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One number", valid: /\d/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];
}

export function SignUpForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const trimmedUsername = formState.username.trim();
  const trimmedEmail = formState.email.trim();
  const passwordChecks = getPasswordChecks(formState.password);
  const isPasswordStrong = passwordChecks.every((check) => check.valid);

  const usernameError = !trimmedUsername
    ? "Username is required."
    : trimmedUsername.length < 3
      ? "Username must be at least 3 characters."
      : !usernamePattern.test(trimmedUsername)
        ? "Use only letters, numbers, and underscores."
        : "";
  const emailError = !trimmedEmail
    ? "Email is required."
    : !isValidEmail(trimmedEmail)
      ? "Enter a valid email address."
      : "";
  const passwordError = !formState.password
    ? "Password is required."
    : !isPasswordStrong
      ? "Choose a stronger password."
      : "";
  const canSubmit = !usernameError && !emailError && !passwordError;
  const showUsernameError =
    (touched.username || hasSubmitted) && !!usernameError;
  const showEmailError = (touched.email || hasSubmitted) && !!emailError;
  const showPasswordError =
    (touched.password || hasSubmitted) && !!passwordError;
  const firstBlockingMessage = usernameError || emailError || passwordError;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setTouched({
      username: true,
      email: true,
      password: true,
    });

    if (!canSubmit) {
      toast.error(firstBlockingMessage);
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
          email: trimmedEmail,
          password: formState.password,
        }),
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* <div className="grid gap-4 md:grid-cols-2"> */}
        <div>
          <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Username
          </label>
          <input
            className={`w-full rounded-[1.35rem] border-2 bg-[#f7ffef] px-4 py-2 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 ${
              showUsernameError
                ? "border-[#d97b6c]"
                : "border-[var(--line)] focus:border-[#ffcf83]"
            }`}
            value={formState.username}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                username: event.target.value,
              }))
            }
            onBlur={() =>
              setTouched((current) => ({ ...current, username: true }))
            }
            required
          />
          {showUsernameError ? (
            <p className="mt-2 text-sm font-semibold text-[#b45e40]">
              {usernameError}
            </p>
          ) : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
            Email
          </label>
          <input
            className={`w-full rounded-[1.35rem] border-2 bg-[#f7ffef] px-4 py-2 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 ${
              showEmailError
                ? "border-[#d97b6c]"
                : "border-[var(--line)] focus:border-[#ffcf83]"
            }`}
            type="email"
            value={formState.email}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            onBlur={() =>
              setTouched((current) => ({ ...current, email: true }))
            }
            required
          />
          {showEmailError ? (
            <p className="mt-2 text-sm font-semibold text-[#b45e40]">
              {emailError}
            </p>
          ) : null}
        </div>
      {/* </div> */}
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
          Password
        </label>
        <div className="relative">
          <input
            className={`w-full rounded-t-[1.35rem] border-2 bg-[#f7ffef] px-4 py-2 pr-14 text-[var(--ink)] outline-none transition focus:-translate-y-0.5 ${
              showPasswordError
                ? "border-[#d97b6c]"
                : "border-[var(--line)] focus:border-[#ffcf83]"
            }`}
            type={showPassword ? "text" : "password"}
            value={formState.password}
            onChange={(event) =>
              setFormState((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            onBlur={() =>
              setTouched((current) => ({ ...current, password: true }))
            }
            required
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
        <div className="rounded-b-[1.25rem] border-2 border-[var(--line)] bg-[#fffdf8] p-3">
          <div className="grid gap-1 md:grid-cols-2">
            {passwordChecks.map((check) => (
              <p
                key={check.label}
                className={`rounded-full px-3 text-xs sm:text-sm ${
                  check.valid
                    ? "bg-[#f2fff2] font-semibold text-[#5f8f6c]"
                    : "bg-[#fff8ef] text-[var(--muted)]"
                }`}
              >
                {check.valid ? "✓" : "○"} {check.label}
              </p>
            ))}
          </div>
        </div>
        {showPasswordError ? (
          <p className="mt-2 text-sm font-semibold text-[#b45e40]">
            {passwordError}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isPending || !canSubmit}
        aria-disabled={isPending || !canSubmit}
        className={`w-full rounded-[1.35rem] border-2 px-4 py-3 text-sm font-extrabold uppercase tracking-[0.16em] transition ${
          isPending || !canSubmit
            ? "cursor-not-allowed border-[#d8d0bc] bg-[#f5ead2] text-[#9a8f7a] shadow-none"
            : "border-[var(--line)] bg-[#fff0a8] text-[var(--ink)] hover:-translate-y-0.5"
        }`}
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
