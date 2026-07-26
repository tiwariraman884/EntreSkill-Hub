export type RoadmapStepStatus = "Completed" | "Current" | "Locked";

export type Resource = {
  id: string;
  title: string;
  type: "video" | "article" | "checklist" | "quiz";
  url: string;
  duration: string;
};

export type RoadmapStep = {
  id: string;
  title: string;
  description: string;
  order: number;
  status: RoadmapStepStatus;
  estimatedTime: string;
  resources: Resource[];
  tasks: { id: string; text: string; completed: boolean }[];
  notes?: string;
};

export type Roadmap = {
  id: string;
  title: string;
  overview: string;
  estimatedDuration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progressPercent: number;
  mentorRecommendation: string; // Mentor ID
  steps: RoadmapStep[];
};

export const MOCK_ROADMAPS: Roadmap[] = [
  {
    id: "rm-cloud-kitchen",
    title: "Launch a Cloud Kitchen",
    overview: "A comprehensive guide to starting a delivery-only restaurant, from finalizing the menu to onboarding onto Zomato and Swiggy.",
    estimatedDuration: "6 Weeks",
    difficulty: "Intermediate",
    progressPercent: 30,
    mentorRecommendation: "m-1",
    steps: [
      {
        id: "s-1",
        title: "Idea Validation & Menu Planning",
        description: "Research local delivery apps to find a gap in the market. Create a focused, delivery-friendly menu.",
        order: 1,
        status: "Completed",
        estimatedTime: "3 Days",
        resources: [
          { id: "r-1", title: "How to validate your food idea", type: "video", url: "#", duration: "10 min" },
          { id: "r-2", title: "Designing a delivery-proof menu", type: "article", url: "#", duration: "5 min read" },
        ],
        tasks: [
          { id: "t-1", text: "Analyze competitor menus in a 5km radius", completed: true },
          { id: "t-2", text: "Finalize top 10 items", completed: true },
        ],
      },
      {
        id: "s-2",
        title: "Legal & FSSAI Registration",
        description: "Register your business entity and obtain the mandatory FSSAI food license.",
        order: 2,
        status: "Completed",
        estimatedTime: "1 Week",
        resources: [
          { id: "r-3", title: "FSSAI Application Guide", type: "checklist", url: "#", duration: "3 min" },
        ],
        tasks: [
          { id: "t-3", text: "Register MSME/Udyam", completed: true },
          { id: "t-4", text: "Apply for FSSAI Basic Registration", completed: true },
        ],
      },
      {
        id: "s-3",
        title: "Kitchen Setup & Sourcing",
        description: "Rent a low-cost commercial space and purchase essential equipment.",
        order: 3,
        status: "Current",
        estimatedTime: "2 Weeks",
        resources: [
          { id: "r-4", title: "Essential Cloud Kitchen Equipment List", type: "checklist", url: "#", duration: "5 min" },
          { id: "r-5", title: "Negotiating with suppliers", type: "video", url: "#", duration: "15 min" },
        ],
        tasks: [
          { id: "t-5", text: "Sign lease for kitchen space", completed: false },
          { id: "t-6", text: "Order commercial burners and chillers", completed: false },
          { id: "t-7", text: "Finalize packaging vendors", completed: false },
        ],
        notes: "Make sure to prioritize a space with good exhaust systems and hygiene.",
      },
      {
        id: "s-4",
        title: "Swiggy/Zomato Onboarding",
        description: "Register as a merchant on food delivery platforms and optimize your profile.",
        order: 4,
        status: "Locked",
        estimatedTime: "1 Week",
        resources: [
          { id: "r-6", title: "Optimizing your Swiggy listing", type: "video", url: "#", duration: "12 min" },
        ],
        tasks: [
          { id: "t-8", text: "Submit FSSAI & bank details to platforms", completed: false },
          { id: "t-9", text: "Upload high-quality food photography", completed: false },
        ],
      },
      {
        id: "s-5",
        title: "Launch & Initial Marketing",
        description: "Run inaugural discounts, launch on platforms, and acquire first 100 customers.",
        order: 5,
        status: "Locked",
        estimatedTime: "2 Weeks",
        resources: [
          { id: "r-7", title: "Cost-per-click strategies on food apps", type: "article", url: "#", duration: "8 min read" },
        ],
        tasks: [
          { id: "t-10", text: "Run 'Flat 50% Off' inaugural campaign", completed: false },
          { id: "t-11", text: "Print flyers for local distribution", completed: false },
        ],
      },
    ],
  },
  {
    id: "rm-freelance",
    title: "Freelance Graphic Design",
    overview: "Set up your freelance design business, build a portfolio, and land your first client.",
    estimatedDuration: "4 Weeks",
    difficulty: "Beginner",
    progressPercent: 0,
    mentorRecommendation: "m-2",
    steps: [
      {
        id: "s-1",
        title: "Portfolio Creation",
        description: "Compile your best work into a cohesive portfolio on Behance or a personal site.",
        order: 1,
        status: "Current",
        estimatedTime: "1 Week",
        resources: [
          { id: "r-1", title: "What makes a great design portfolio", type: "video", url: "#", duration: "15 min" },
        ],
        tasks: [
          { id: "t-1", text: "Select 3-5 best projects", completed: false },
          { id: "t-2", text: "Write case studies for each", completed: false },
        ],
      },
      {
        id: "s-2",
        title: "Platform Setup (Upwork/Fiverr)",
        description: "Create optimized profiles on freelance marketplaces.",
        order: 2,
        status: "Locked",
        estimatedTime: "3 Days",
        resources: [
          { id: "r-2", title: "Upwork profile optimization", type: "article", url: "#", duration: "5 min read" },
        ],
        tasks: [
          { id: "t-3", text: "Write a compelling bio", completed: false },
          { id: "t-4", text: "Set competitive initial pricing", completed: false },
        ],
      },
      {
        id: "s-3",
        title: "Client Acquisition & Pitching",
        description: "Learn how to write proposals and cold outreach emails.",
        order: 3,
        status: "Locked",
        estimatedTime: "2 Weeks",
        resources: [
          { id: "r-3", title: "Winning proposal templates", type: "checklist", url: "#", duration: "2 min" },
        ],
        tasks: [
          { id: "t-5", text: "Send 10 cold emails to local businesses", completed: false },
          { id: "t-6", text: "Submit 5 proposals on Upwork", completed: false },
        ],
      }
    ],
  }
];

// Helper to get fallback roadmap
export function getRoadmap(id: string): Roadmap {
  const found = MOCK_ROADMAPS.find(r => r.id === id);
  if (found) return found;

  // Generic fallback for any other ID
  return {
    id,
    title: "Business Launch Roadmap",
    overview: "A standard step-by-step guide to validating and launching your business idea.",
    estimatedDuration: "8 Weeks",
    difficulty: "Beginner",
    progressPercent: 0,
    mentorRecommendation: "m-1",
    steps: [
      {
        id: "s-1",
        title: "Idea Validation",
        description: "Confirm market demand before spending money.",
        order: 1,
        status: "Current",
        estimatedTime: "1 Week",
        resources: [],
        tasks: [
          { id: "t-1", text: "Talk to 10 potential customers", completed: false }
        ]
      },
      {
        id: "s-2",
        title: "Product/Service Development",
        description: "Build your Minimum Viable Product (MVP).",
        order: 2,
        status: "Locked",
        estimatedTime: "3 Weeks",
        resources: [],
        tasks: [
          { id: "t-2", text: "Create MVP", completed: false }
        ]
      },
      {
        id: "s-3",
        title: "Launch & Marketing",
        description: "Bring your product to the market.",
        order: 3,
        status: "Locked",
        estimatedTime: "2 Weeks",
        resources: [],
        tasks: [
          { id: "t-3", text: "Acquire first paying customer", completed: false }
        ]
      }
    ]
  };
}
