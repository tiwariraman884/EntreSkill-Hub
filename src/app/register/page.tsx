"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/domains/auth/schema";
import { z } from "zod";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon, ArrowRightIcon, Loader2Icon, CheckCircleIcon } from "lucide-react";

type FormState = z.infer<typeof registerSchema>;
type FormErrors = Partial<Record<keyof FormState, string>>;

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Spinner() {
  return <Loader2Icon className="size-4 animate-spin" />;
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Number", met: /[0-9]/.test(password) },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.met).length;
  const scorePct = (score / checks.length) * 100;

  let barColor = "bg-destructive";
  if (score >= 3) barColor = "bg-emerald-500";
  else if (score >= 2) barColor = "bg-amber-500";

  if (!password) return null;

  return (
    <div className="space-y-2 pt-1">
      <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${scorePct}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        {checks.map((check) => (
          <span
            key={check.label}
            className={`text-[11px] flex items-center gap-1 ${check.met ? "text-emerald-600 dark:text-emerald-500" : "text-muted-foreground"}`}
          >
            {check.met && <CheckCircleIcon className="size-2.5" />}
            {check.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Focus name input after mount
    setTimeout(() => {
      nameRef.current?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const validateField = useCallback(<K extends keyof FormState>(field: K, value: string) => {
    const result = registerSchema.shape[field as keyof typeof registerSchema.shape].safeParse(value);
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
    setSuccess("");
    setErrors({});

    const payload = {
      name: name.trim(),
      email: email.trim(),
      password,
      confirmPassword,
    };

    const validated = registerSchema.safeParse(payload);
    if (!validated.success) {
      const fieldErrors: FormErrors = {};
      validated.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormErrors;
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      const firstField = validated.error.issues[0]?.path[0];
      if (firstField === "name") nameRef.current?.focus();
      else if (firstField === "email") emailRef.current?.focus();
      else if (firstField === "password") passwordRef.current?.focus();
      else if (firstField === "confirmPassword") confirmRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.code === "VALIDATION_ERROR" && data.error.fields) {
          const fieldErrors: FormErrors = {};
          data.error.fields.forEach((f: { field: string; message: string }) => {
            const key = f.field as keyof FormErrors;
            if (key) fieldErrors[key] = f.message;
          });
          setErrors(fieldErrors);
          setError("Please fix the errors above and try again.");
        } else if (data.error?.code === "CONFLICT") {
          setError("An account with this email already exists. Try signing in instead.");
        } else if (data.error?.code === "RATE_LIMIT_EXCEEDED") {
          setError("Too many attempts. Please wait a moment and try again.");
        } else {
          setError(data.error?.message || "Registration failed. Please try again.");
        }
        return;
      }

      setSuccess("Account created! Check your email to verify your account before signing in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError("");
    setSuccess("");
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setError("Failed to connect to Google. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300"
        style={{ animationFillMode: "both" }}
      >
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-lg shadow-black/5 p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <UserIcon className="size-5 text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-semibold text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Start your entrepreneurship journey today
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div
              ref={errorRef}
              role="alert"
              aria-live="assertive"
              tabIndex={-1}
              className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/8 text-destructive px-3 py-2.5 text-sm animate-in slide-in-from-top-2 duration-200"
            >
              <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                className="ml-auto shrink-0 rounded-md p-0.5 text-destructive/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label="Dismiss error"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          {success && (
            <div
              role="status"
              aria-live="polite"
              tabIndex={-1}
              className="mb-6 flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/8 text-emerald-700 dark:text-emerald-400 px-3 py-2.5 text-sm animate-in slide-in-from-top-2 duration-200"
            >
              <CheckCircleIcon className="mt-0.5 size-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  ref={nameRef}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Raman Kumar Tiwari"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); validateField("name", e.target.value); }}
                  onBlur={(e) => validateField("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={loading || !!success}
                  className="pl-9 h-10"
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-xs text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
                  <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); validateField("email", e.target.value); }}
                  onBlur={(e) => validateField("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={loading || !!success}
                  className="pl-9 h-10"
                  spellCheck={false}
                  inputMode="email"
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
                  <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  ref={passwordRef}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); validateField("password", e.target.value); }}
                  onKeyUp={handleCapsLock}
                  onKeyDown={handleCapsLock}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  disabled={loading || !!success}
                  className="pl-9 pr-9 h-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  disabled={loading || !!success}
                >
                  {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
              {errors.password && (
                <p id="password-error" className="text-xs text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
                  <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.password}
                </p>
              )}
              {capsLockOn && (
                <p className="text-xs text-amber-600 dark:text-amber-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
                  <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Caps Lock is on
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  ref={confirmRef}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(""); validateField("confirmPassword", e.target.value); }}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                  disabled={loading || !!success}
                  className="pl-9 pr-9 h-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  aria-pressed={showConfirm}
                  disabled={loading || !!success}
                >
                  {showConfirm ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirm-error" className="text-xs text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
                  <svg className="size-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-10 text-sm font-medium group"
              disabled={loading || !!success}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRightIcon className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/60" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide shrink-0">Or continue with</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          {/* Google Sign Up */}
          <Button
            variant="outline"
            className="w-full h-10 mt-4"
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading || !!success}
            aria-busy={googleLoading}
          >
            {googleLoading ? <Spinner /> : <GoogleIcon />}
            {googleLoading ? "Connecting..." : "Google"}
          </Button>

          {/* Footer */}
          <div className="mt-7">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded px-1 -mx-1"
              >
                Sign in
              </Link>
            </p>
            {success && (
              <p className="mt-3 text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded px-1 -mx-1"
                >
                  Continue to sign in
                </Link>
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}