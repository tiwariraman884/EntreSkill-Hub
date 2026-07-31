import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_IDEAS } from "@/data/mock-ideas";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Bookmark, Sparkles, Map, Target, 
  Wrench, Wallet, TrendingUp, AlertTriangle, 
  CheckCircle2, Building, Clock, ArrowRight, Share2 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";

export function generateStaticParams() {
  return ALL_IDEAS.map((idea) => ({
    id: idea.id,
  }));
}

export default function IdeaDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const idea = ALL_IDEAS.find((i) => i.id === id);

  if (!idea) {
    notFound();
  }

  return (
    <div className="bg-muted/10 min-h-screen pb-20">
      {/* ─── HERO SECTION ─── */}
      <div className="bg-background border-b relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 pt-8 pb-12 max-w-5xl relative z-10">
          <Link href="/ideas" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="size-4 mr-1" /> Back to Ideas
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 text-sm rounded-full">
                  {idea.category}
                </Badge>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <Sparkles className="size-3.5" />
                  {idea.aiMatchScore}% AI Match
                </div>
                <Badge variant={idea.difficulty === "Beginner" ? "default" : idea.difficulty === "Intermediate" ? "secondary" : "outline"} className="px-3 py-1 text-sm rounded-full">
                  {idea.difficulty}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold font-heading text-foreground leading-tight">
                {idea.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {idea.shortDescription}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <Link href={`/roadmaps/${idea.roadmapId}`}>
                  <Button size="lg" className="rounded-full shadow-md font-semibold px-8">
                    Start Free Roadmap
                    <Map className="ml-2 size-4" />
                  </Button>
                </Link>
                <Button size="icon" variant="outline" className="rounded-full h-11 w-11">
                  <Bookmark className="size-5" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full h-11 w-11 hidden sm:flex">
                  <Share2 className="size-5" />
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-[400px] shrink-0">
              <div className="rounded-2xl overflow-hidden border shadow-xl shadow-black/5 bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={idea.coverImage} alt={idea.title} className="w-full h-48 object-cover" />
                <div className="p-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Investment</p>
                    <p className="font-semibold text-foreground">₹{(idea.investment.min/1000).toFixed(0)}k - {(idea.investment.max/1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Est. Income</p>
                    <p className="font-semibold text-emerald-600">₹{(idea.expectedMonthlyIncome.min/1000).toFixed(0)}k/mo</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Time to Launch</p>
                    <p className="font-semibold flex items-center gap-1.5"><Clock className="size-4 text-muted-foreground" /> {idea.timeToStart}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTENT TABS / BODY ─── */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold font-heading mb-4 flex items-center gap-2">
                <Target className="size-6 text-primary" /> Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {idea.overview}
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-bold font-heading mb-4">Why this business?</h2>
              <ul className="space-y-3">
                {idea.whyThisBusiness.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{reason}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" /> Market Demand & Target Customers
              </h2>
              <div className="bg-white rounded-xl border p-6 space-y-6 shadow-sm">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">The Market</h3>
                  <p className="text-foreground/90">{idea.marketDemand}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Ideal Customers</h3>
                  <div className="flex flex-wrap gap-2">
                    {idea.targetCustomers.map((customer, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1 font-medium bg-muted/50">{customer}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold font-heading mb-4 flex items-center gap-2">
                <Wallet className="size-5 text-primary" /> Revenue Model
              </h2>
              <p className="text-muted-foreground leading-relaxed p-5 bg-emerald-50/50 border border-emerald-100 rounded-xl text-emerald-900">
                {idea.revenueModel}
              </p>
            </section>

            <section className="grid sm:grid-cols-2 gap-6">
              <div className="bg-red-50/50 border border-red-100 rounded-xl p-6">
                <h3 className="font-bold font-heading text-red-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="size-5 text-red-500" /> Key Risks
                </h3>
                <ul className="space-y-2 text-red-800/80 text-sm">
                  {idea.risks.map((risk, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0">•</span> <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
                <h3 className="font-bold font-heading text-blue-900 mb-4 flex items-center gap-2">
                  <Sparkles className="size-5 text-blue-500" /> Success Tips
                </h3>
                <ul className="space-y-2 text-blue-800/80 text-sm">
                  {idea.successTips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0">•</span> <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-bold font-heading mb-4 flex items-center gap-2">
                <Wrench className="size-5 text-muted-foreground" /> Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {idea.requiredSkills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="px-2.5 py-1 font-medium">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h3 className="font-bold font-heading mb-4 flex items-center gap-2">
                <Building className="size-5 text-muted-foreground" /> Real Examples
              </h3>
              <ul className="space-y-3">
                {idea.realExamples.map((example, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/90">
                    <div className="size-1.5 rounded-full bg-primary/50" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary text-primary-foreground rounded-xl shadow-lg p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 size-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <h3 className="font-bold font-heading text-lg mb-2 relative z-10">Ready to build this?</h3>
              <p className="text-primary-foreground/80 text-sm mb-5 relative z-10">
                Get a step-by-step personalized roadmap to launch your {idea.title.toLowerCase()} business.
              </p>
              <Link href={`/roadmaps/${idea.roadmapId}`}>
                <Button className="w-full bg-white text-primary hover:bg-white/90 relative z-10">
                  View Roadmap <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
