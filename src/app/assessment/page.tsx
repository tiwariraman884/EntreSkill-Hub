"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MOCK_ASSESSMENT_QUESTIONS, AssessmentDomain } from "@/data/mock-assessment";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, ArrowRight, ArrowLeft, SkipForward, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Select a subset of questions (e.g. 15 questions) for the assessment to not make it endlessly long for the demo.
// We'll pick a mix of domains.
const ASSESSMENT_LENGTH = 15;
const selectedQuestions = MOCK_ASSESSMENT_QUESTIONS.slice(0, ASSESSMENT_LENGTH);

export default function AssessmentWizard() {
  const router = useRouter();
  const { setAssessmentScores } = useGlobalState();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [isStarted, setIsStarted] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isStarted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [selectedQuestions[currentIndex].id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    toast.loading("Analyzing your profile...");
    
    // Calculate scores per domain
    const scores: Partial<Record<AssessmentDomain, number>> = {};
    const domainCounts: Partial<Record<AssessmentDomain, number>> = {};

    selectedQuestions.forEach(q => {
      const selectedOptionId = answers[q.id];
      const option = q.options.find(o => o.id === selectedOptionId);
      
      const score = option ? option.score : 0; // 0 if skipped or incorrect
      
      scores[q.domain] = (scores[q.domain] || 0) + score;
      domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 10; // Assuming 10 is max score per question
    });

    // Normalize scores to percentage per domain
    const normalizedScores: any = {};
    Object.keys(scores).forEach(domain => {
      const d = domain as AssessmentDomain;
      const maxPossible = domainCounts[d] || 1;
      normalizedScores[d] = Math.round((Math.max(scores[d]!, 0) / maxPossible) * 100);
    });

    setTimeout(() => {
      setAssessmentScores(normalizedScores);
      toast.dismiss();
      toast.success("Analysis complete!");
      router.push("/assessment/results");
    }, 1500);
  };

  if (!isStarted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="max-w-xl w-full border-2 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Brain className="size-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-heading">AI Skill Assessment</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground text-lg">
              Discover your entrepreneurial strengths and weaknesses. Our AI will analyze your responses to create a personalized learning roadmap and recommend the perfect business ideas for you.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-muted/50 p-4 rounded-xl border">
                <p className="font-semibold text-foreground flex items-center gap-2 mb-1">
                  <Clock className="size-4 text-primary" /> 15 Minutes
                </p>
                <p className="text-sm text-muted-foreground">Estimated time to complete</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-xl border">
                <p className="font-semibold text-foreground flex items-center gap-2 mb-1">
                  <AlertCircle className="size-4 text-primary" /> {selectedQuestions.length} Questions
                </p>
                <p className="text-sm text-muted-foreground">Multiple choice & scenarios</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full text-lg h-14 rounded-xl" onClick={() => setIsStarted(true)}>
              Start Assessment <ArrowRight className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentIndex];
  const progressPercent = ((currentIndex) / selectedQuestions.length) * 100;
  const isAnswered = !!answers[currentQuestion.id];
  const isLastQuestion = currentIndex === selectedQuestions.length - 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl min-h-[80vh] flex flex-col">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8 bg-background p-4 rounded-xl border shadow-sm">
        <div className="flex items-center gap-4 w-2/3">
          <div className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-md text-sm shrink-0">
            Q {currentIndex + 1} / {selectedQuestions.length}
          </div>
          <div className="w-full">
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-2 font-mono font-medium px-4 py-2 rounded-lg",
          timeLeft < 60 ? "bg-red-100 text-red-700 animate-pulse" : "bg-muted text-muted-foreground"
        )}>
          <Clock className="size-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question Card */}
      <Card className="flex-1 flex flex-col border shadow-md">
        <CardHeader>
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Domain: {currentQuestion.domain}
            </span>
          </div>
          <CardTitle className="text-2xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 py-6 space-y-3">
          {currentQuestion.options.map((option, i) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 group",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border hover:border-primary/40 hover:bg-muted/30"
                )}
              >
                <div className={cn(
                  "size-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors",
                  isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary/50"
                )}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className={cn("text-base", isSelected ? "text-foreground font-medium" : "text-foreground/80")}>
                  {option.text}
                </span>
              </button>
            )
          })}
        </CardContent>
        <CardFooter className="border-t p-6 bg-muted/10 flex items-center justify-between">
          <Button variant="ghost" onClick={handlePrevious} disabled={currentIndex === 0}>
            <ArrowLeft className="mr-2 size-4" /> Previous
          </Button>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleSkip} disabled={isLastQuestion}>
              Skip <SkipForward className="ml-2 size-4" />
            </Button>
            
            <Button 
              size="lg" 
              onClick={handleNext}
              disabled={!isAnswered && !isLastQuestion}
              className={cn("px-8", isLastQuestion ? "bg-emerald-600 hover:bg-emerald-700" : "")}
            >
              {isLastQuestion ? "Submit Assessment" : "Next Question"} 
              {!isLastQuestion && <ArrowRight className="ml-2 size-4" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
