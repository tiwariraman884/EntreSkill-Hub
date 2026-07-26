"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/domains/auth/schema";
import { z } from "zod";
import {
  EyeIcon, EyeOffIcon, LockIcon, MailIcon,
  ArrowRightIcon, Loader2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = z.infer<typeof loginSchema>;
type FormErrors = Partial<Record<keyof FormState, string>>;

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Spinner() {
  return <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />;
}

function InlineError({ message }: { message: string }) {
  return (
    <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
      <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
}

export interface AuthLoginFormProps {
  /** Text shown on the primary submit button */
  ctaLabel: string;
  /** URL to redirect to after successful login (overridden by callbackUrl param) */
  defaultRedirect: string;
  /** Register link href */
  registerHref?: string;
  /** Register link label */
  registerLabel?: string;
  /** Extra className for the card container */
  className?: string;
}

export default function AuthLoginForm({
  ctaLabel,
  defaultRedirect,
  registerHref = "/register",
  registerLabel = "Create free account",
  className,
}: AuthLoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || defaultRedirect;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      emailRef.current?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const validateField = useCallback(<K extends keyof FormState>(field: K, value: string) => {
    const result = loginSchema.shape[field as keyof typeof loginSchema.shape].safeParse(value);
    if (result.success) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    } else {
      setErrors((prev) => ({ ...prev, [field]: result.error.issues[0]?.message || "" }));
    }
  }, []);

  const handleCapsLock = useCallback((e: React.KeyboardEvent) => {
    setCapsLockOn(e.getModifierState("CapsLock"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrors({});

    const payload = { email: email.trim(), password };
    const validated = loginSchema.safeParse(payload);
    if (!validated.success) {
      const fieldErrors: FormErrors = {};
      validated.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormErrors;
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      const firstField = validated.error.issues[0]?.path[0];
      if (firstField === "email") emailRef.current?.focus();
      else if (firstField === "password") passwordRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: payload.email,
        password: payload.password,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl });
    } catch {
      setError("Failed to connect to Google. Please try again.");
      setGoogleLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className={cn("w-full rounded-2xl border border-border/60 bg-card/90 backdrop-blur-sm shadow-xl shadow-black/5 p-8", className)}>
      {/* Global Error Banner */}
      {error && (
        <div
          ref={errorRef}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/8 text-destructive px-3 py-2.5 text-sm animate-in slide-in-from-top-2 duration-200 focus:outline-none"
        >
          <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            className="ml-auto shrink-0 rounded-md p-0.5 text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Dismiss error"
          >
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="auth-email" className="text-sm font-medium">Email address</Label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              ref={emailRef}
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); validateField("email", e.target.value); }}
              onBlur={(e) => validateField("email", e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "auth-email-error" : undefined}
              disabled={loading}
              className="pl-9 h-11"
              spellCheck={false}
              inputMode="email"
            />
          </div>
          {errors.email && <InlineError message={errors.email} />}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="auth-password" className="text-sm font-medium">Password</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <Input
              ref={passwordRef}
              id="auth-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); validateField("password", e.target.value); }}
              onKeyUp={handleCapsLock}
              onKeyDown={handleCapsLock}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "auth-password-error" : undefined}
              disabled={loading}
              className="pl-9 pr-10 h-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={loading}
            >
              {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          </div>
          {errors.password && <InlineError message={errors.password} />}
          {capsLockOn && (
            <p className="text-xs text-amber-600 flex items-center gap-1 animate-in fade-in duration-150" role="alert">
              <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Caps Lock is on
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input
            id="auth-remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-input accent-primary cursor-pointer"
          />
          <Label htmlFor="auth-remember" className="text-sm text-muted-foreground cursor-pointer select-none">
            Remember me for 30 days
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-11 text-sm font-semibold group shadow-sm"
          disabled={loading || googleLoading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <Spinner />
              <span className="ml-2">Signing in...</span>
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3" role="separator">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider shrink-0">or</span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      {/* Google */}
      <Button
        variant="outline"
        className="w-full h-11 gap-3 font-medium"
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading || loading}
        aria-busy={googleLoading}
      >
        {googleLoading ? <Spinner /> : <GoogleIcon />}
        {googleLoading ? "Connecting..." : "Continue with Google"}
      </Button>

      {/* Register */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href={registerHref}
          className="font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded"
        >
          {registerLabel}
        </Link>
      </p>
    </div>
  );
}
