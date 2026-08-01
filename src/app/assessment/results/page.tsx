"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGlobalState } from "@/context/GlobalStateContext";
import { ALL_IDEAS } from "@/data/mock-ideas";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

const RadarChart = dynamic(() => import("@/components/charts/radar-chart"), {
  ssr: false,
  loading: () => <div className="w-full h-75 bg-muted/50 animate-pulse rounded-xl" />
});
import { Target, GraduationCap, ArrowRight, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { useIsClient } from "@/lib/use-is-client";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AssessmentResultsPage() {
  const router = useRouter();
  const { assessmentScores } = useGlobalState();
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient && assessmentScores === null) {
      router.push("/assessment");
    }
  }, [isClient, assessmentScores, router]);

  if (!isClient || !assessmentScores) return null;

  const chartData = Object.entries(assessmentScores).map(([subject, score]) => ({
    subject,
    score: score || 0,
    fullMark: 100,
  }));

  const sortedScores = [...chartData].sort((a, b) => b.score - a.score);
  const strengths = sortedScores.slice(0, 3);
  const weaknesses = sortedScores.slice(-3).reverse();

  const totalScore = Object.values(assessmentScores).reduce((acc, curr) => (acc || 0) + (curr || 0), 0);
  const averageScore = Math.round((totalScore || 0) / Object.keys(assessmentScores).length);

  const weakDomains = weaknesses.map(w => w.subject.toLowerCase());
  const recommendedResources = MOCK_LEARNING_RESOURCES.filter(r =>
    weakDomains.some(d => r.category.toLowerCase().includes(d) || r.tags.includes(d))
  ).slice(0, 3);

  const strongDomains = strengths.map(s => s.subject.toLowerCase());
  const recommendedIdeas = ALL_IDEAS.filter(idea =>
    idea.aiMatchScore >= 80 || strongDomains.some(d => idea.category.toLowerCase().includes(d))
  ).sort((a, b) => b.aiMatchScore - a.aiMatchScore).slice(0, 3);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="container mx-auto px-4 py-12 md:py-16 max-w-6xl"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="mb-16 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo/10 mb-6 shadow-glow-indigo"
        >
          <TrendingUp className="size-6 text-indigo" strokeWidth={1.5} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight mb-4">
          Your <span className="gradient-text-hero">Entrepreneurial Profile</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Based on your assessment, we&apos;ve analyzed your skills to provide a personalized roadmap for success.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {/* Radar Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-premium bg-white/80 backdrop-blur-2xl h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-heading">Skill Radar</CardTitle>
              <CardDescription>Visual breakdown of your proficiency across key business domains.</CardDescription>
            </CardHeader>
            <CardContent className="h-87.5 md:h-105">
                <RadarChart data={chartData.map(d => ({ subject: d.subject, A: d.score, fullMark: d.fullMark }))} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Score Summary Sidebar */}
        <motion.div variants={item} className="space-y-6">
          <Card className="bg-linear-to-br from-indigo to-indigo-dark text-white border-0 shadow-premium overflow-hidden relative">
            <div className="absolute -right-6 -top-6 size-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-4 -bottom-4 size-24 bg-marigold/10 rounded-full blur-2xl pointer-events-none" />
            <CardHeader className="pb-3 relative">
              <CardTitle className="text-base font-medium opacity-90">Business Readiness</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-5xl md:text-6xl font-black mb-3 tracking-tight">
                {averageScore}
                <span className="text-2xl md:text-3xl opacity-70 font-bold">/100</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                {averageScore >= 80
                  ? "You are highly prepared to launch a startup!"
                  : averageScore >= 60
                    ? "You have a solid foundation. Focus on your weaknesses."
                    : "You are at the beginning of your journey. Great time to learn!"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-premium bg-white/80 backdrop-blur-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 font-heading">
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600">
                  <TrendingUp className="size-4" />
                </span>
                Top Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengths.map(s => (
                  <li key={s.subject} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{s.subject}</span>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-semibold">
                      {s.score}%
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-premium bg-white/80 backdrop-blur-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 font-heading">
                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
                  <AlertTriangle className="size-4" />
                </span>
                Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {weaknesses.map(w => (
                  <li key={w.subject} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{w.subject}</span>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-semibold">
                      {w.score}%
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations */}
      <div className="space-y-16">
        {/* Recommended Learning */}
        <motion.section variants={item}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2.5 rounded-2xl bg-indigo/10 text-indigo shadow-glow-indigo">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading tracking-tight">Recommended Learning</h2>
              <p className="text-muted-foreground text-sm mt-1">Targeted resources to improve your focus areas.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedResources.map((resource, idx) => (
              <motion.div
                key={resource.id}
                variants={item}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/resource/${resource.id}`}>
                  <Card className="h-full border-0 shadow-premium bg-white/80 backdrop-blur-2xl overflow-hidden hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <div className="h-40 bg-muted/60 relative overflow-hidden">
                      <Image
                        src={resource.thumbnail}
                        alt={resource.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-foreground border-none backdrop-blur-sm font-semibold">
                        {resource.category}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-base line-clamp-2 group-hover:text-indigo transition-colors leading-snug">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                        <Clock className="size-3.5" /> {resource.duration}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/learn">
              <Button variant="outline" size="lg" className="rounded-xl border-2 hover:border-indigo/40 hover:bg-indigo/5">
                Explore All Courses <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Recommended Ideas */}
        <motion.section variants={item}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-2.5 rounded-2xl bg-marigold/10 text-marigold shadow-glow-marigold">
              <Target className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-heading tracking-tight">Business Ideas For You</h2>
              <p className="text-muted-foreground text-sm mt-1">High AI Match scores based on your strengths.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedIdeas.map((idea, idx) => (
              <motion.div
                key={idea.id}
                variants={item}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/ideas/${idea.id}`}>
                  <Card className="h-full border-0 shadow-premium bg-white/80 backdrop-blur-2xl overflow-hidden hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className="text-xs font-semibold border-border/60">
                          {idea.category}
                        </Badge>
                        <Badge className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white border-none shadow-sm shadow-emerald-500/20 font-semibold">
                          {idea.aiMatchScore}% Match
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg line-clamp-1 mb-2 group-hover:text-indigo transition-colors leading-snug">
                        {idea.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {idea.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/ideas">
              <Button variant="outline" size="lg" className="rounded-xl border-2 hover:border-indigo/40 hover:bg-indigo/5">
                Browse All Ideas <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
