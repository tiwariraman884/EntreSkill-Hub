export type QuestionType = "mcq" | "scenario" | "true_false";
export type AssessmentDomain = "Entrepreneurship" | "Marketing" | "Finance" | "Sales" | "Leadership" | "Technology";

export interface AssessmentQuestion {
  id: string;
  domain: AssessmentDomain;
  type: QuestionType;
  question: string;
  options: { id: string; text: string; score: number }[]; // score determines proficiency contribution
}

const generateQuestions = (domain: AssessmentDomain, count: number, startId: number): AssessmentQuestion[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `q-${startId + i}`,
    domain,
    type: i % 4 === 0 ? "scenario" : i % 3 === 0 ? "true_false" : "mcq",
    question: `A sample question testing your proficiency in ${domain}. Which of the following is the best approach?`,
    options: [
      { id: "a", text: "The strategic, optimal approach.", score: 10 },
      { id: "b", text: "A moderate, acceptable approach.", score: 5 },
      { id: "c", text: "A poor, risky approach.", score: 0 },
      { id: "d", text: "A completely incorrect approach.", score: -2 },
    ]
  }));
};

export const MOCK_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Handcrafted examples
  {
    id: "q-1",
    domain: "Finance",
    type: "mcq",
    question: "What is 'burn rate' in the context of a startup?",
    options: [
      { id: "a", text: "The rate at which a company spends its cash reserves before generating positive cash flow.", score: 10 },
      { id: "b", text: "The speed at which employees experience burnout.", score: 0 },
      { id: "c", text: "The rate of customer churn per month.", score: 0 },
      { id: "d", text: "The time it takes to develop an MVP.", score: 0 },
    ]
  },
  {
    id: "q-2",
    domain: "Marketing",
    type: "scenario",
    question: "You have a $500 marketing budget for your new local bakery. What is the most effective way to spend it?",
    options: [
      { id: "a", text: "Targeted Instagram and Facebook ads within a 5-mile radius offering a discount for first-time visitors.", score: 10 },
      { id: "b", text: "Buying a half-page ad in a national magazine.", score: 0 },
      { id: "c", text: "Printing 50,000 generic flyers and dropping them randomly across the city.", score: 2 },
      { id: "d", text: "Paying a celebrity influencer on Twitter.", score: 0 },
    ]
  },
  {
    id: "q-3",
    domain: "Entrepreneurship",
    type: "true_false",
    question: "A Minimum Viable Product (MVP) should include every feature you eventually want in the final product.",
    options: [
      { id: "a", text: "True", score: 0 },
      { id: "b", text: "False", score: 10 },
    ]
  },
  ...generateQuestions("Entrepreneurship", 8, 4),
  ...generateQuestions("Marketing", 8, 12),
  ...generateQuestions("Finance", 8, 20),
  ...generateQuestions("Sales", 8, 28),
  ...generateQuestions("Leadership", 8, 36),
  ...generateQuestions("Technology", 7, 44),
];
