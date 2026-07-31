"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Award, Download, Share2, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { cn } from "@/lib/utils";

export default function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const resource = MOCK_LEARNING_RESOURCES.find((r) => r.id === id);

  if (!resource) {
    return (
      <div className="min-h-screen bg-muted/20 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
          <EmptyState
            icon="search"
            title="Certificate not found"
            description="We couldn't find a certificate matching that ID. It may have been removed or the link is incorrect."
            actionLabel="Browse Certificates"
            actionHref="/dashboard"
          />
        </div>
      </div>
    );
  }

  const certId = `CERT-${resource.id.toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedResources = MOCK_LEARNING_RESOURCES.filter(
    (r) => r.id !== resource.id && r.category === resource.category
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-muted/20 py-10 sm:py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* ─── Top Bar ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2.5">
            <Button variant="outline" size="sm">
              <Share2 className="size-4 mr-1.5" />
              Share on LinkedIn
            </Button>
            <Button size="sm">
              <Download className="size-4 mr-1.5" />
              Download PDF
            </Button>
          </div>
        </motion.div>

        {/* ─── Certificate Card ───────────────────────────── */}
        <motion.div
          whileHover={{ y: -6, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <Card
            className={cn(
              "border-2 border-dashed border-border/60 shadow-premium bg-white",
              "overflow-hidden relative"
            )}
          >
            {/* Watermark */}
            <div
              className="absolute top-0 right-0 p-8 sm:p-14 opacity-[0.04] pointer-events-none select-none"
              aria-hidden="true"
            >
              <Award className="size-80 sm:size-96" />
            </div>

            <CardContent className="p-8 sm:p-14 md:p-20 text-center relative z-10">
              {/* Logo + Brand */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                className="mb-10"
              >
                <div className="flex items-center justify-center gap-2.5 mb-5">
                  <Image
                    src="/logo.png"
                    alt="EntreSkill Hub"
                    width={44}
                    height={44}
                    className="object-contain select-none shrink-0"
                  />
                  <span className="text-xl font-bold font-heading">
                    EntreSkill Hub
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="mb-4 font-heading text-[11px] tracking-widest uppercase"
                >
                  Certificate of Completion
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif text-slate-800 tracking-wide leading-tight">
                  Certificate of Completion
                </h1>
              </motion.div>

              {/* Cert Body */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                className="space-y-5 mb-12"
              >
                <p className="text-base sm:text-lg text-muted-foreground italic">
                  This is to certify that
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 border-b-2 border-slate-200 inline-block px-8 sm:px-12 pb-2">
                  Entrepreneur
                </p>
                <p className="text-base sm:text-lg text-muted-foreground italic">
                  has successfully completed the course
                </p>
                <p className="text-xl sm:text-2xl font-bold text-primary max-w-2xl mx-auto leading-tight">
                  {resource.title}
                </p>
              </motion.div>

              {/* Footer: Date · QR · Signature */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
                className="mt-16 pt-8 border-t border-slate-200"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Issue Date */}
                  <div className="text-left sm:text-left text-center">
                    <p className="text-sm font-bold text-slate-800">
                      {issueDate}
                    </p>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">
                      Date of Issue
                    </p>
                  </div>

                  {/* QR + Cert ID */}
                  <div className="text-center">
                    <div className="size-[72px] bg-slate-50 border-2 border-dashed border-slate-200 mx-auto mb-2 flex items-center justify-center rounded-lg">
                      <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                        QR CODE
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {certId}
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="text-right sm:text-right text-center">
                    <p className="text-base font-serif italic text-slate-800 border-b border-slate-400 px-4 mb-1">
                      Jane Doe
                    </p>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                      Director of Education
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Verification Banner ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.35 }}
          className="mt-8"
        >
          <Card className="bg-white/70 border-border/40 shadow-premium">
            <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-verified/15 to-emerald-400/10 border border-verified/15 flex items-center justify-center flex-shrink-0">
                  <Award className="size-4 text-verified" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Verified Certificate
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Certificate ID{" "}
                    <span className="font-mono text-foreground">
                      {certId}
                    </span>{" "}
                    · Issued {issueDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="default" className="text-[11px]">
                  ✓ Authentic
                </Badge>
                <Button variant="outline" size="xs">
                  <ExternalLink className="size-3 mr-1" />
                  Verify Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Related Certificates ────────────────────────── */}
        {relatedResources.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
            className="mt-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-border/60" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Related Certificates
              </h2>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedResources.map((rr, idx) => (
                <motion.div
                  key={rr.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.55 + idx * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <Link href={`/certificates/${rr.id}`}>
                    <Card className="bg-white border-border/40 shadow-premium hoverable h-full group">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo/10 to-indigo-light/10 border border-indigo/10 flex items-center justify-center">
                          <Award className="size-5 text-indigo" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-indigo transition-colors duration-200">
                            {rr.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[11px] text-muted-foreground">
                              {rr.category}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {rr.difficulty}
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-indigo transition-colors duration-200 flex-shrink-0 mt-0.5" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
