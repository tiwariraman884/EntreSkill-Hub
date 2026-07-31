"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_ASSESSMENT_QUESTIONS, AssessmentDomain } from "@/data/mock-assessment";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, ArrowRight, ArrowLeft, SkipForward, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ASSESSMENT_LENGTH = 15;
const selectedQuestions = MOCK_ASSESSMENT_QUESTIONS.slice(0, ASSESSMENT_LENGTH);

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function AssessmentWizard() {
  const router = useRouter();
  const { setAssessmentScores } = useGlobalState();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [direction, setDirection] = useState(0);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    toast.loading("Analyzing your profile...");

    const scores: Partial<Record<AssessmentDomain, number>> = {};
    const domainCounts: Partial<Record<AssessmentDomain, number>> = {};

    selectedQuestions.forEach(q => {
      const selectedOptionId = answers[q.id];
      const option = q.options.find(o => o.id === selectedOptionId);
      const score = option ? option.score : 0;

      scores[q.domain] = (scores[q.domain] || 0) + score;
      domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 10;
    });

    const normalizedScores: Record<string, number> = {};
    Object.keys(scores).forEach(domain => {
      const d = domain as AssessmentDomain;
      const maxPossible = domainCounts[d] || 1;
      normalizedScores[d] = Math.round((Math.max(scores[d] || 0, 0) / maxPossible) * 100);
    });

    setTimeout(() => {
      setAssessmentScores(normalizedScores);
      toast.dismiss();
      toast.success("Analysis complete!");
      router.push("/assessment/results");
    }, 1500);
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [selectedQuestions[currentIndex].id]: optionId
    }));
  };

  const navigateTo = (index: number) => {
    if (index >= 0 && index < selectedQuestions.length) {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      navigateTo(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigateTo(currentIndex - 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      navigateTo(currentIndex + 1);
    }
  };

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

  const currentQuestion = selectedQuestions[currentIndex];
  const progressPercent = ((currentIndex) / selectedQuestions.length) * 100;
  const isAnswered = !!answers[currentQuestion.id];
  const isLastQuestion = currentIndex === selectedQuestions.length - 1;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-8">
      <AnimatePresence mode="wait">
        {!isStarted ? (
          <motion.div
            key="start"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            <Card className="border-0 shadow-premium bg-white/80 backdrop-blur-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-indigo/5 via-transparent to-marigold/5 pointer-events-none" />
              <CardHeader className="text-center pt-10 pb-6 relative">
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto bg-linear-to-br from-indigo/10 to-indigo-light/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-glow-indigo"
                >
                  <Brain className="size-9 text-indigo" strokeWidth={1.5} />
                </motion.div>
                <CardTitle className="text-3xl md:text-4xl font-heading tracking-tight">
                  AI Skill Assessment
                </CardTitle>
                <p className="text-muted-foreground text-base mt-3 max-w-md mx-auto leading-relaxed">
                  Discover your entrepreneurial strengths and weaknesses. Our AI will analyze your responses to create a personalized learning roadmap.
                </p>
              </CardHeader>
              <CardContent className="px-6 pb-8 relative space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-muted/60 rounded-2xl p-5 border border-border/60"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 rounded-lg bg-indigo/10">
                        <Clock className="size-4 text-indigo" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">15 Minutes</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Estimated time to complete</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-muted/60 rounded-2xl p-5 border border-border/60"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 rounded-lg bg-marigold/10">
                        <AlertCircle className="size-4 text-marigold" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">{selectedQuestions.length} Questions</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Multiple choice & scenarios</p>
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full h-14 text-base font-semibold rounded-2xl shadow-lg shadow-indigo/20 hover:shadow-xl hover:shadow-indigo/30"
                    onClick={() => setIsStarted(true)}
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="wizard"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-3xl flex flex-col"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex items-center justify-between mb-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-border/60 px-5 py-4 shadow-premium"
            >
              <div className="flex items-center gap-4 w-2/3">
                <Badge variant="default" className="shrink-0 font-mono">
                  Q {currentIndex + 1} / {selectedQuestions.length}
                </Badge>
                <div className="flex-1">
                  <Progress value={progressPercent} className="h-2" />
                </div>
              </div>
              <div className={cn(
                "flex items-center gap-2 font-mono font-semibold px-4 py-2 rounded-xl text-sm",
                timeLeft < 60
                  ? "bg-danger/10 text-danger"
                  : "bg-muted/80 text-muted-foreground"
              )}>
                <Clock className="size-4" />
                {formatTime(timeLeft)}
              </div>
            </motion.div>

            {/* Question Card */}
            <Card className="flex-1 flex flex-col border-0 shadow-premium bg-white/80 backdrop-blur-2xl overflow-hidden">
              <CardHeader className="pt-8 pb-5 px-8">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Badge variant="outline" className="mb-4 text-xs font-semibold tracking-wide uppercase">
                    {currentQuestion.domain}
                  </Badge>
                  <CardTitle className="text-xl md:text-2xl leading-relaxed font-heading">
                    {currentQuestion.question}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="flex-1 px-8 py-4 space-y-3">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentQuestion.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 40 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option, i) => {
                      const isSelected = answers[currentQuestion.id] === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => handleSelectOption(option.id)}
                          whileTap={{ scale: 0.985 }}
                          className={cn(
                            "w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group",
                            isSelected
                              ? "border-indigo bg-indigo/4 shadow-sm"
                              : "border-border/80 hover:border-indigo/40 hover:bg-muted/40"
                          )}
                        >
                          <div className={cn(
                            "size-7 rounded-xl border-2 flex items-center justify-center shrink-0 text-sm font-bold transition-all duration-200",
                            isSelected
                              ? "bg-indigo border-indigo text-white shadow-sm shadow-indigo/30"
                              : "border-muted-foreground/30 text-muted-foreground group-hover:border-indigo/40"
                          )}>
                            {isSelected ? (
                              <CheckCircle2 className="size-4" />
                            ) : (
                              String.fromCharCode(65 + i)
                            )}
                          </div>
                          <span className={cn("text-base leading-relaxed", isSelected ? "text-foreground font-medium" : "text-foreground/80")}>
                            {option.text}
                          </span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
              <CardFooter className="border-t border-border/60 bg-muted/20 px-8 py-5 flex items-center justify-between backdrop-blur-sm">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="rounded-xl"
                >
                  <ArrowLeft className="mr-2 size-4" /> Previous
                </Button>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    disabled={isLastQuestion}
                    className="rounded-xl"
                  >
                    Skip <SkipForward className="ml-2 size-4" />
                  </Button>

                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={!isAnswered && !isLastQuestion}
                    className={cn(
                      "rounded-xl font-semibold shadow-lg",
                      isLastQuestion
                        ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-px"
                        : "bg-linear-to-r from-indigo to-indigo-light text-white shadow-indigo/20 hover:shadow-indigo/30 hover:-translate-y-px"
                    )}
                  >
                    {isLastQuestion ? "Submit Assessment" : "Next Question"}
                    {!isLastQuestion && <ArrowRight className="ml-2 size-4" />}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
