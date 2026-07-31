"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, ArrowRightIcon, Loader2Icon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Suspense } from "react";

function Spinner() {
  return <Loader2Icon className="size-4 animate-spin" />;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15, when: "beforeChildren" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleError = useCallback(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      handleError();
    }, 0);
  }, [handleError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError(data.error?.message || "Something went wrong");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <Card glow>
          <CardHeader className="text-center pt-10 pb-2 px-8">
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-indigo-light shadow-lg shadow-indigo/25"
            >
              <LockIcon className="size-6 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-heading font-bold">Reset your password</CardTitle>
            <CardDescription className="text-base mt-1">
              Enter your new password below
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div variants={fadeUp}>
                  <Alert variant="destructive">
                    <AlertTitle>Something went wrong</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {success && (
                <motion.div variants={fadeUp}>
                  <Alert variant="success">
                    <AlertTitle>Password reset successful</AlertTitle>
                    <AlertDescription>
                      Your password has been reset. Redirecting to login...
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">New password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-thread pointer-events-none" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pl-10 h-11"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm new password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-thread pointer-events-none" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pl-10 h-11"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button
                  type="submit"
                  disabled={loading || !token}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Resetting password...
                    </>
                  ) : (
                    <>
                      Reset password
                      <ArrowRightIcon className="ml-1.5 size-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-center text-sm text-thread">
              Remember your password?{" "}
              <Link href="/login" className="font-semibold text-indigo hover:text-indigo-light transition-colors">
                Back to login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
