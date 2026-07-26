"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { ALL_IDEAS } from "@/data/mock-ideas";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Target, Lightbulb, GraduationCap, Download, ArrowRight, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AssessmentResultsPage() {
  const router = useRouter();
  const { assessmentScores } = useGlobalState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (assessmentScores === null) {
      router.push("/assessment");
    }
  }, [assessmentScores, router]);

  if (!mounted || !assessmentScores) return null;

  // Format data for Radar Chart
  const chartData = Object.entries(assessmentScores).map(([subject, score]) => ({
    subject,
    score: score || 0,
    fullMark: 100,
  }));

  // Analyze strengths and weaknesses
  const sortedScores = [...chartData].sort((a, b) => b.score - a.score);
  const strengths = sortedScores.slice(0, 3);
  const weaknesses = sortedScores.slice(-3).reverse();

  // Determine Business Readiness Score (average)
  const totalScore = Object.values(assessmentScores).reduce((acc, curr) => (acc || 0) + (curr || 0), 0);
  const averageScore = Math.round((totalScore || 0) / Object.keys(assessmentScores).length);

  // Recommendations based on weaknesses
  const weakDomains = weaknesses.map(w => w.subject.toLowerCase());
  const recommendedResources = MOCK_LEARNING_RESOURCES.filter(r => 
    weakDomains.some(d => r.category.toLowerCase().includes(d) || r.tags.includes(d))
  ).slice(0, 3);

  // Recommend Ideas based on strengths
  const strongDomains = strengths.map(s => s.subject.toLowerCase());
  const recommendedIdeas = ALL_IDEAS.filter(idea => 
    idea.aiMatchScore >= 80 || strongDomains.some(d => idea.category.toLowerCase().includes(d))
  ).sort((a, b) => b.aiMatchScore - a.aiMatchScore).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Your Entrepreneurial Profile</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Based on your assessment, we&apos;ve analyzed your skills to provide a personalized roadmap for success.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Radar Chart */}
        <Card className="lg:col-span-2 border-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">Skill Radar</CardTitle>
            <CardDescription>Visual breakdown of your proficiency across key business domains.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value}%`, 'Proficiency']}
                />
                <Radar
                  name="Your Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Summary */}
        <div className="space-y-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-md overflow-hidden relative">
            <div className="absolute -right-4 -top-4 size-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg opacity-90">Business Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black mb-2">{averageScore}<span className="text-2xl opacity-70">/100</span></div>
              <p className="text-primary-foreground/80 text-sm">
                {averageScore >= 80 ? "You are highly prepared to launch a startup!" :
                 averageScore >= 60 ? "You have a solid foundation. Focus on your weaknesses." :
                 "You are at the beginning of your journey. Great time to learn!"}
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="size-5 text-emerald-500" /> Top Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengths.map(s => (
                  <li key={s.subject} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{s.subject}</span>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                      {s.score}%
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="size-5 text-amber-500" /> Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {weaknesses.map(w => (
                  <li key={w.subject} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-foreground">{w.subject}</span>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">
                      {w.score}%
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations Sections */}
      <div className="space-y-12">
        
        {/* Recommended Learning */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading">Recommended Learning</h2>
              <p className="text-muted-foreground text-sm">Targeted resources to improve your focus areas.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedResources.map(resource => (
              <Link href={`/resource/${resource.id}`} key={resource.id}>
                <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 group">
                  <div className="h-32 bg-muted relative overflow-hidden rounded-t-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <Badge className="absolute top-2 right-2 bg-background/90 text-foreground border-none">
                      {resource.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">{resource.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="size-3" /> {resource.duration}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/learn">
              <Button variant="outline">
                Explore All Courses <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Recommended Ideas */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
              <Target className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading">Business Ideas For You</h2>
              <p className="text-muted-foreground text-sm">High AI Match scores based on your strengths.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedIdeas.map(idea => (
              <Link href={`/ideas/${idea.id}`} key={idea.id}>
                <Card className="h-full hover:shadow-md transition-all hover:border-primary/50 group">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="text-xs font-semibold">{idea.category}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                        {idea.aiMatchScore}% Match
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors">{idea.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{idea.shortDescription}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/ideas">
              <Button variant="outline">
                Browse All Ideas <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
