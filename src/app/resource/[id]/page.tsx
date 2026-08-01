"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import {
  ArrowLeft,
  FileText,
  Video,
  CheckSquare,
  Bookmark,
  CheckCircle2,
  Clock,
  Eye,
  Star,
  ArrowRight,
  Share2,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45 },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function ObjectiveCircle({ num, text }: { num: number; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: num * 0.06, duration: 0.3 }}
      className="flex items-start gap-3.5"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
        {num}
      </span>
      <span className="pt-1 text-sm leading-relaxed text-foreground/90">{text}</span>
    </motion.div>
  );
}

function TocStep({ step, index }: { step: string; index: number }) {
  const isActive = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className="relative flex items-center gap-3"
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-200",
          isActive
            ? "border-primary bg-primary text-white"
            : "border-muted-foreground/30 bg-background text-muted-foreground"
        )}
      >
        {index + 1}
      </span>
      <span
        className={cn(
          "text-sm leading-snug transition-colors duration-200",
          isActive ? "font-semibold text-foreground" : "text-muted-foreground"
        )}
      >
        {step}
      </span>
    </motion.div>
  );
}

export default function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const resource = MOCK_LEARNING_RESOURCES.find((r) => r.id === id);
  const {
    isBookmarked,
    addBookmark,
    removeBookmark,
    isResourceCompleted,
    markResourceComplete,
  } = useGlobalState();

  if (!resource) {
    notFound();
  }

  const completed = isResourceCompleted(resource.id);
  const bookmarked = isBookmarked(resource.id);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(resource.id);
    } else {
      addBookmark(resource.id, "learning");
    }
  };

  const handleComplete = () => {
    markResourceComplete(resource.id);
  };

  const breadcrumbItems = [
    { label: "Learning Hub", href: "/learn" },
    { label: resource.category },
    { label: resource.title },
  ];

  const relatedResources = MOCK_LEARNING_RESOURCES.filter(
    (r) => r.id !== resource.id && r.category === resource.category
  ).slice(0, 3);

  const typeIconMap: Record<string, typeof FileText> = {
    video: Video,
    article: FileText,
    checklist: CheckSquare,
  };
  const TypeIcon = typeIconMap[resource.type] ?? FileText;

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* ─── Sticky Header ───────────────────────────────────── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="size-4" />
            Back to Library
          </Link>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleBookmark}
              className={cn(
                "transition-all duration-200",
                bookmarked &&
                  "text-primary border-primary/40 bg-primary/5 shadow-sm shadow-primary/10"
              )}
            >
              <Bookmark
                className={cn("size-4 mr-1.5", bookmarked && "fill-current")}
              />
              {bookmarked ? "Saved" : "Save"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
            >
              <Share2 className="size-4 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>

      {/* ─── Main Content ───────────────────────────────────── */}
      <div className="container mx-auto px-4 pt-8 pb-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <BreadcrumbNav items={breadcrumbItems} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Content Column ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero media */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="rounded-2xl overflow-hidden bg-black border border-border shadow-premium relative aspect-video flex items-center justify-center"
            >
              {resource.type === "video" && resource.videoUrl ? (
                <iframe
                  src={resource.videoUrl}
                  title={resource.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    src={resource.thumbnail}
                    alt={resource.title}
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="relative z-10 flex flex-col items-center justify-center text-white p-6 text-center">
                    {resource.type !== "video" && (
                      <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.4, ease: "backOut" }}
                        className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-5 shadow-lg"
                      >
                        <TypeIcon className="size-8 text-white/90" />
                      </motion.div>
                    )}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-2xl md:text-3xl font-bold font-heading leading-tight"
                    >
                      {resource.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="opacity-80 mt-2.5 max-w-md text-sm leading-relaxed"
                    >
                      {resource.description}
                    </motion.p>
                  </div>
                </>
              )}
            </motion.div>

            {/* Meta strip: badges, difficulty, duration, views */}
            <motion.div
              variants={sectionVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-2"
            >
              <Badge variant="default" className="text-xs font-semibold">
                {resource.category}
              </Badge>

              <Badge
                variant={
                  resource.difficulty === "Beginner"
                    ? "default"
                    : resource.difficulty === "Intermediate"
                    ? "secondary"
                    : "outline"
                }
                className="text-xs font-semibold"
              >
                {resource.difficulty}
              </Badge>

              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground ml-1">
                <Clock className="size-3.5" />
                {resource.duration}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Eye className="size-3.5" />
                {resource.views.toLocaleString()} views
              </span>
            </motion.div>

            {/* Title + action bar */}
            <motion.div
              variants={sectionVariants}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground leading-tight mb-5">
                {resource.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-border">
                <div className="flex items-center gap-5">
                  <div className="flex -space-x-2.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="size-8 rounded-full bg-muted border-2 border-background overflow-hidden shadow-sm"
                      >
                        <Image
                          src={`https://i.pravatar.cc/100?img=${i + 10}`}
                          alt="Learner"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="size-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                      +2k
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <Star className="size-4 text-amber-500 fill-amber-500" />
                    {resource.rating.toFixed(1)}
                    <span className="font-normal text-muted-foreground">
                      (420 ratings)
                    </span>
                  </span>
                </div>

                {!completed ? (
                  <Button
                    onClick={handleComplete}
                    className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    <CheckCircle2 className="size-4 mr-2" />
                    Mark Complete
                  </Button>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50"
                  >
                    <Award className="size-5" />
                    <span>Completed</span>
                    <span className="text-xs text-emerald-500/80 font-medium">
                      (+50 XP)
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Content body */}
            <motion.div
              variants={sectionVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <p className="text-base leading-relaxed text-muted-foreground">
                {resource.content || resource.description}
              </p>

              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-4">
                  Learning Objectives
                </h3>
                <ul className="space-y-3">
                  {resource.objectives.map((obj, i) => (
                    <ObjectiveCircle key={i} num={i + 1} text={obj} />
                  ))}
                </ul>
              </div>

              {resource.type === "article" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold font-heading text-foreground">
                    1. Introduction
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <h3 className="text-lg font-semibold font-heading text-foreground">
                    2. Core Frameworks
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Action CTA footer */}
            {!completed && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-14 p-6 bg-linear-to-br from-muted/40 to-muted/10 border border-border rounded-2xl flex flex-col items-center text-center shadow-sm"
              >
                <h3 className="font-heading font-bold text-lg text-foreground mb-1.5">
                  Finished this lesson?
                </h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-sm leading-relaxed">
                  Mark it as complete to earn XP and update your dashboard
                  progress.
                </p>
                <Button
                  size="lg"
                  onClick={handleComplete}
                  className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto"
                >
                  Mark Complete
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Table of contents */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
            >
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-1">
                    <div className="absolute inset-y-0 left-2.75 w-px bg-muted" />
                    <div className="space-y-1.5">
                      {["Introduction", "Core Concepts", "Real-world Examples", "Conclusion"].map(
                        (chapter, i) => (
                          <TocStep key={i} step={chapter} index={i} />
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mentor callout */}
            {resource.mentorId && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
              >
                <Card className="relative overflow-hidden bg-linear-to-br from-primary/8 to-primary/3 border-primary/15 shadow-sm">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-primary/8 to-transparent rounded-bl-full pointer-events-none" />
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-primary">
                      Need Clarification?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Discuss this topic directly with a mentor who specializes
                      in{" "}
                      <span className="font-semibold text-foreground">
                        {resource.category}
                      </span>
                      .
                    </p>
                    <Link href={`/mentors/${resource.mentorId}`} className="block">
                      <Button
                        variant="outline"
                        className="w-full bg-background/60 hover:bg-background shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        Book Mentor Session
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Related Topics */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28, duration: 0.45, ease: "easeOut" }}
            >
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                    Related Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-normal capitalize cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-secondary/20 hover:-translate-y-0.5"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.36, duration: 0.45, ease: "easeOut" }}
              >
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                      Related Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {relatedResources.map((rr) => (
                        <li key={rr.id}>
                          <Link
                            href={`/resource/${rr.id}`}
                            className="group block"
                          >
                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 border border-transparent hover:border-border transition-all duration-200 cursor-pointer"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-heading font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                                  {rr.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-[10px] font-semibold px-2 py-0.5 rounded-full border-0 bg-muted text-muted-foreground">
                                    {rr.difficulty}
                                  </Badge>
                                  <span className="text-[11px] text-muted-foreground">
                                    {rr.duration}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                            </motion.div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
