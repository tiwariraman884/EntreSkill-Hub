"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertClose } from "@/components/ui/alert";
import { loginSchema } from "@/domains/auth/schema";
import { z } from "zod";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  ArrowRightIcon,
  Loader2Icon,
  ShieldCheckIcon,
  XIcon,
} from "lucide-react";

type FormState = z.infer<typeof loginSchema>;
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

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      emailRef.current?.focus();
    }, 0);
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

    const payload = {
      email: email.trim(),
      password,
    };

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
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
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
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setError("Failed to connect to Google. Please try again.");
      setGoogleLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Left decorative panel - desktop only */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden items-center justify-center bg-gradient-to-br from-indigo to-indigo-dark"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 text-xs">
              <ShieldCheckIcon className="size-3.5" />
              Secure Authentication
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl xl:text-5xl font-heading font-bold text-white leading-tight"
          >
            Welcome back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4 text-white/70 text-lg leading-relaxed max-w-sm mx-auto"
          >
            Continue your entrepreneurship journey with AI-powered mentorship and resources.
          </motion.p>
        </div>
      </motion.div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-background to-muted/20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="w-full max-w-md"
        >
          {/* Mobile header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:hidden text-center mb-6"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-indigo-light shadow-lg shadow-indigo/25">
              <UserIcon className="size-6 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Welcome back</h1>
            <p className="text-sm text-thread mt-1">
              Enter your credentials to access your account
            </p>
          </motion.div>

          <Card className="glass-card w-full max-w-md dark:bg-ink/80 dark:border-white/10" glow>
            <div className="p-6 sm:p-8 space-y-6">
              {/* Desktop header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-8 text-center hidden lg:block"
              >
                <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Sign in to your account</h1>
                <p className="text-sm text-thread">
                  Enter your credentials to continue
                </p>
              </motion.div>

              {/* Error Alert */}
              {error && (
                <Alert
                  ref={errorRef}
                  tabIndex={-1}
                  variant="destructive"
                  className="mb-5 grid-cols-[auto_1fr]"
                >
                  <span>{error}</span>
                  <AlertClose onClick={() => setError("")}>
                    <XIcon className="size-3.5" />
                  </AlertClose>
                </Alert>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-thread pointer-events-none" />
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
                      disabled={loading}
                      className="pl-10 h-11"
                      spellCheck={false}
                      inputMode="email"
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-xs text-danger flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                    <Link href="/forgot-password" className="text-xs font-medium text-indigo hover:text-indigo-light">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-thread pointer-events-none" />
                    <Input
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); validateField("password", e.target.value); }}
                      onKeyUp={handleCapsLock}
                      onKeyDown={handleCapsLock}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      disabled={loading}
                      className="pl-10 pr-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-thread hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo/50"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="text-xs text-danger flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150" role="alert">
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

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-semibold group"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRightIcon className="ml-1.5 size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="mt-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-border/60" />
                <span className="text-xs text-thread uppercase tracking-wide shrink-0 font-medium">Or continue with</span>
                <div className="h-px flex-1 bg-border/60" />
              </div>

              {/* Google Sign In */}
              <Button
                variant="outline"
                className="w-full h-11 mt-4 border-2 border-indigo/20 hover:bg-indigo/5 hover:border-indigo/40 transition-all"
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
                aria-busy={googleLoading}
              >
                {googleLoading ? <Spinner /> : <GoogleIcon />}
                {googleLoading ? "Connecting..." : "Google"}
              </Button>

              {/* Footer */}
              <div className="mt-7">
                <p className="text-center text-sm text-thread">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-indigo hover:text-indigo-light transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-thread/70">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
