export type LearningResourceType = "video" | "article" | "checklist";
export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface LearningResource {
  id: string;
  title: string;
  type: LearningResourceType;
  category: string;
  difficulty: DifficultyLevel;
  duration: string; // e.g. "15 min"
  thumbnail: string;
  description: string;
  objectives: string[];
  tags: string[];
  views: number;
  rating: number; // out of 5
  mentorId?: string; // Optional recommended mentor
  createdAt: string;
  // Detail page specifics
  content?: string; // For articles/checklists or video transcript
  videoUrl?: string; // e.g., YouTube embed URL
}

const CATEGORIES = ["Business Strategy", "Marketing", "Finance", "Sales", "Legal", "Product", "Leadership"];

// Curated real Unsplash photo URLs for learning resource thumbnails (cycling)
const LEARNING_THUMBNAILS = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", // business meeting
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", // analytics
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800", // finance charts
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800", // startup office
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800", // laptop code
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", // business professional
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800", // marketing board
  "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=800", // notebook planning
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800", // team collaboration
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800", // legal documents
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800", // ecommerce
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", // professional woman
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800", // workshop
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", // team meeting
];

// Helper to generate multiple items rapidly
const generateResources = (startIdx: number, count: number, template: Partial<LearningResource>): LearningResource[] => {
  return Array.from({ length: count }).map((_, i) => {
    const idNum = startIdx + i;
    const isVideo = idNum % 3 === 0;
    const isChecklist = idNum % 7 === 0;
    
    let type: LearningResourceType = "article";
    if (isVideo) type = "video";
    if (isChecklist) type = "checklist";

    const difficulty: DifficultyLevel = idNum % 5 === 0 ? "Advanced" : idNum % 2 === 0 ? "Intermediate" : "Beginner";
    
    return {
      id: `lr-${idNum}`,
      title: `${template.title || "Understanding"} - Lesson ${idNum}`,
      type,
      category: CATEGORIES[idNum % CATEGORIES.length],
      difficulty,
      duration: `${10 + (idNum % 20)} min`,
      thumbnail: LEARNING_THUMBNAILS[idNum % LEARNING_THUMBNAILS.length],
      description: `A comprehensive ${type} covering essential topics in ${CATEGORIES[idNum % CATEGORIES.length].toLowerCase()}. Perfect for ${difficulty.toLowerCase()} entrepreneurs.`,
      objectives: [
        "Understand core concepts",
        "Apply theory to your startup",
        "Avoid common pitfalls"
      ],
      tags: ["startup", type, CATEGORIES[idNum % CATEGORIES.length].toLowerCase()],
      views: 100 + (idNum * 37) % 5000,
      rating: 4.0 + (idNum % 10) / 10,
      createdAt: new Date(Date.now() - (idNum * 86400000)).toISOString(),
      content: "This is premium content designed to accelerate your entrepreneurial journey. Apply these frameworks to validate your idea rapidly.",
      videoUrl: type === "video" ? "https://www.youtube.com/embed/dQw4w9WgXcQ" : undefined,
    };
  });
};

export const MOCK_LEARNING_RESOURCES: LearningResource[] = [
  // High quality hand-crafted items
  {
    id: "lr-1",
    title: "The Business Model Canvas Explained",
    type: "video",
    category: "Business Strategy",
    difficulty: "Beginner",
    duration: "18 min",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    description: "Learn how to map out your entire business model on a single page using the renowned Business Model Canvas framework.",
    objectives: [
      "Identify your key partners and activities",
      "Define your unique value proposition",
      "Map out cost structures and revenue streams"
    ],
    tags: ["strategy", "planning", "canvas"],
    views: 15420,
    rating: 4.9,
    mentorId: "m-1",
    createdAt: "2024-01-10T00:00:00Z",
    videoUrl: "https://www.youtube.com/embed/IP0cUBWTGpY", // Placeholder
  },
  {
    id: "lr-2",
    title: "Lean Startup Methodology",
    type: "article",
    category: "Product",
    difficulty: "Intermediate",
    duration: "10 min read",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    description: "Discover how to build a Minimum Viable Product (MVP) and use the Build-Measure-Learn feedback loop to iterate quickly.",
    objectives: [
      "Understand the MVP concept",
      "Learn to measure validated learning",
      "Pivot or persevere effectively"
    ],
    tags: ["mvp", "lean", "product"],
    views: 8200,
    rating: 4.7,
    createdAt: "2024-01-15T00:00:00Z",
    content: "The Lean Startup provides a scientific approach to creating and managing startups and get a desired product to customers' hands faster..."
  },
  {
    id: "lr-3",
    title: "Company Registration Checklist (India)",
    type: "checklist",
    category: "Legal",
    difficulty: "Beginner",
    duration: "5 min",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    description: "A definitive checklist of all the legal registrations you need (GST, MSME, Incorporation) before launching your business in India.",
    objectives: [
      "Ensure legal compliance",
      "Protect your brand name",
      "Open a corporate bank account"
    ],
    tags: ["legal", "registration", "gst"],
    views: 24500,
    rating: 4.8,
    createdAt: "2024-02-01T00:00:00Z",
  },
  ...generateResources(4, 47, { title: "Entrepreneur Masterclass" })
];
