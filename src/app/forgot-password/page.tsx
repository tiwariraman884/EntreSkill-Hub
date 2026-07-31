"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon, ArrowRightIcon, Loader2Icon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";

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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
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
              <MailIcon className="size-6 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-heading font-bold">Reset your password</CardTitle>
            <CardDescription className="text-base mt-1">
              Enter your email and we&apos;ll send you a reset link
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div variants={fadeUp}>
                  <Alert variant="destructive">
                    <AlertTitle>Unable to send reset link</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {success && (
                <motion.div variants={fadeUp}>
                  <Alert variant="success">
                    <AlertTitle>Check your inbox</AlertTitle>
                    <AlertDescription>
                      If an account exists with that email, you will receive a password reset link shortly.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-thread pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-11"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      Send reset link
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
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
