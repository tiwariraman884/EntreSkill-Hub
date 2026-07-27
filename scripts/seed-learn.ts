import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { connectToDatabase } from "../src/lib/mongoose";
import { LearningResource, User } from "../src/models";

const _categories = [
  "Business Planning", "Marketing", "Finance", "Sales", 
  "Product Development", "Leadership", "Startup Legal", 
  "AI Tools", "Operations", "Branding", "Customer Research", 
  "Technology", "Pitching", "Growth"
];

const videos = [
  { title: "How to Validate a Startup Idea", instructor: "Michael Chen", category: "Business Planning", url: "https://www.youtube.com/watch?v=1", duration: "18 mins" },
  { title: "Lean Startup Explained", instructor: "Sarah Johnson", category: "Operations", url: "https://www.youtube.com/watch?v=2", duration: "25 mins" },
  { title: "Market Research for Beginners", instructor: "David Smith", category: "Customer Research", url: "https://www.youtube.com/watch?v=3", duration: "30 mins" },
  { title: "Finding Your First Customers", instructor: "Amanda Lee", category: "Sales", url: "https://www.youtube.com/watch?v=4", duration: "45 mins" },
  { title: "MVP Development Guide", instructor: "Chris Walker", category: "Product Development", url: "https://www.youtube.com/watch?v=5", duration: "1.5 hours" },
  { title: "Branding Basics", instructor: "Elena Rodriguez", category: "Branding", url: "https://www.youtube.com/watch?v=6", duration: "20 mins" },
  { title: "Digital Marketing Fundamentals", instructor: "James Wilson", category: "Marketing", url: "https://www.youtube.com/watch?v=7", duration: "1 hour" },
  { title: "Financial Planning for Startups", instructor: "Robert Fox", category: "Finance", url: "https://www.youtube.com/watch?v=8", duration: "40 mins" },
  { title: "Startup Pitch Deck Masterclass", instructor: "Jessica Taylor", category: "Pitching", url: "https://www.youtube.com/watch?v=9", duration: "55 mins" },
  { title: "Customer Discovery Process", instructor: "Daniel Moore", category: "Customer Research", url: "https://www.youtube.com/watch?v=10", duration: "22 mins" },
  { title: "Product Market Fit", instructor: "Sophia White", category: "Product Development", url: "https://www.youtube.com/watch?v=11", duration: "1.2 hours" },
  { title: "Business Model Canvas", instructor: "William Harris", category: "Business Planning", url: "https://www.youtube.com/watch?v=12", duration: "35 mins" },
  { title: "Building a Personal Brand", instructor: "Olivia Martin", category: "Branding", url: "https://www.youtube.com/watch?v=13", duration: "45 mins" },
  { title: "Sales Fundamentals", instructor: "Ethan Thompson", category: "Sales", url: "https://www.youtube.com/watch?v=14", duration: "28 mins" },
  { title: "Time Management for Founders", instructor: "Ava Garcia", category: "Leadership", url: "https://www.youtube.com/watch?v=15", duration: "15 mins" },
];

const articles = [
  { title: "How to Register a Business", author: "Legal Aid Foundation", category: "Startup Legal", duration: "8 min read" },
  { title: "Choosing the Right Business Structure", author: "Startup Docs", category: "Startup Legal", duration: "12 min read" },
  { title: "Marketing on a Small Budget", author: "Marketing Monthly", category: "Marketing", duration: "10 min read" },
  { title: "Pricing Strategies", author: "FinTech Hub", category: "Finance", duration: "7 min read" },
  { title: "Startup Legal Checklist", author: "Law & Order", category: "Startup Legal", duration: "5 min read" },
  { title: "Finding Investors", author: "Venture Weekly", category: "Finance", duration: "15 min read" },
  { title: "Bootstrapping vs Funding", author: "Founders Digest", category: "Finance", duration: "9 min read" },
  { title: "Customer Acquisition", author: "Growth Hackers", category: "Growth", duration: "11 min read" },
  { title: "SEO Basics", author: "Search Engine Journal", category: "Marketing", duration: "14 min read" },
  { title: "Building a Sales Funnel", author: "Sales Mastery", category: "Sales", duration: "6 min read" },
  { title: "Financial Forecasting", author: "Numbers & Data", category: "Finance", duration: "18 min read" },
  { title: "Hiring Your First Employee", author: "HR Today", category: "Leadership", duration: "10 min read" },
  { title: "Branding Mistakes", author: "Creative Minds", category: "Branding", duration: "8 min read" },
  { title: "Social Media Strategy", author: "Social Sprout", category: "Marketing", duration: "12 min read" },
  { title: "Productivity Tips", author: "Focus Daily", category: "Operations", duration: "5 min read" },
];

const checklists = [
  { title: "Business Launch Checklist", category: "Business Planning", tasks: ["Define MVP", "Register Domain", "Set up LLC", "Create Bank Account", "Launch Website"] },
  { title: "Market Research Checklist", category: "Customer Research", tasks: ["Identify Target Audience", "Analyze Competitors", "Conduct Surveys", "Evaluate Pricing", "Create SWOT Analysis"] },
  { title: "Startup Registration Checklist", category: "Startup Legal", tasks: ["Choose Name", "File Articles of Incorporation", "Get EIN", "Apply for Licenses", "Open Bank Account"] },
  { title: "Branding Checklist", category: "Branding", tasks: ["Design Logo", "Select Color Palette", "Choose Typography", "Create Brand Guidelines", "Setup Social Profiles"] },
  { title: "MVP Checklist", category: "Product Development", tasks: ["Define Core Features", "Wireframe UI", "Build Prototype", "Test with Users", "Deploy V1"] },
  { title: "Product Launch Checklist", category: "Marketing", tasks: ["Teaser Campaign", "Press Release", "Email Newsletter", "Product Hunt Submission", "Social Media Announcements"] },
  { title: "Investor Pitch Checklist", category: "Pitching", tasks: ["Problem Statement", "Solution", "Market Size", "Business Model", "Financial Projections", "Team Slide"] },
  { title: "Marketing Campaign Checklist", category: "Marketing", tasks: ["Set Goals", "Define Budget", "Create Assets", "Setup Tracking", "Launch Ads", "Analyze Results"] },
  { title: "Website Launch Checklist", category: "Technology", tasks: ["Domain Connected", "SSL Active", "Mobile Responsive", "SEO Tags Added", "Analytics Installed"] },
  { title: "Customer Interview Checklist", category: "Customer Research", tasks: ["Define Questions", "Recruit Participants", "Schedule Calls", "Record Session", "Synthesize Feedback"] },
];

const getThumbnail = (category: string) => {
  const map: Record<string, string> = {
    "Business Planning": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    "Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    "Finance": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    "Sales": "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800",
    "Product Development": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
    "Leadership": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    "Startup Legal": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    "Branding": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
    "Customer Research": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
    "Pitching": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    "Operations": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    "Growth": "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=800",
    "Technology": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    "AI Tools": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  };
  return map[category] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800";
};

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRating = () => Number((Math.random() * 1 + 4).toFixed(1)); // 4.0 to 5.0
const getViews = () => Math.floor(Math.random() * 50000) + 1000;
const difficulties = ["beginner", "intermediate", "advanced"];

const generateMarkdownContent = (title: string, category: string) => `
# ${title}

Welcome to this comprehensive guide on **${title}**. In this article, we'll dive deep into the fundamentals of ${category} to help you build and scale your startup.

## Introduction
Starting a business requires strong foundational knowledge. Understanding the core principles of ${category} will give you an unfair advantage in the market.

## Key Concepts
1. **Understand your market**: Before building, know who you are building for.
2. **Iterate quickly**: Speed is the ultimate weapon for startups.
3. **Focus on growth**: Everything else is secondary.

### Implementation Strategies
* Start small and measure.
* Collect feedback continuously.
* Do not over-optimize early on.

## Conclusion
By mastering the principles outlined above, you can significantly reduce risk and increase your chances of success. Good luck on your journey!
`;

const seed = async () => {
  await connectToDatabase();

  // Wipe existing learning resources to ensure clean slate with new schema
  console.log("Wiping existing Learning Resources...");
  await LearningResource.deleteMany({});

  // Ensure an admin user exists to attribute uploads
  let adminUser = await User.findOne({ role: "admin" });
  if (!adminUser) {
    adminUser = await User.findOneAndUpdate(
      { email: "admin@entreskillhub.com" },
      { name: "Admin", email: "admin@entreskillhub.com", role: "admin", skills: [], interests: [], location: { state: "MH", district: "Mumbai", isRural: false } },
      { upsert: true, new: true }
    );
  }

  const allResources = [];

  for (const v of videos) {
    allResources.push({
      title: v.title,
      description: "A comprehensive video guide to master " + v.title.toLowerCase() + ".",
      thumbnail: getThumbnail(v.category),
      type: "video",
      category: v.category,
      difficulty: getRandom(difficulties),
      duration: v.duration,
      instructor: v.instructor,
      rating: getRating(),
      views: getViews(),
      url: v.url,
      uploadedBy: adminUser._id,
      approvalStatus: "approved",
      tags: [v.category, "Startup", "Video"],
    });
  }

  for (const a of articles) {
    allResources.push({
      title: a.title,
      description: "An in-depth article exploring the key aspects of " + a.title.toLowerCase() + ".",
      thumbnail: getThumbnail(a.category),
      type: "article",
      category: a.category,
      difficulty: getRandom(difficulties),
      duration: a.duration,
      instructor: a.author,
      rating: getRating(),
      views: getViews(),
      content: generateMarkdownContent(a.title, a.category),
      uploadedBy: adminUser._id,
      approvalStatus: "approved",
      tags: [a.category, "Guide", "Reading"],
    });
  }

  for (const c of checklists) {
    allResources.push({
      title: c.title,
      description: "A step-by-step checklist to ensure you don't miss anything for your " + c.title.toLowerCase() + ".",
      thumbnail: getThumbnail(c.category),
      type: "checklist",
      category: c.category,
      difficulty: getRandom(difficulties),
      duration: c.tasks.length + " tasks",
      instructor: "EntreSkill Hub Team",
      rating: getRating(),
      views: getViews(),
      tasks: c.tasks,
      uploadedBy: adminUser._id,
      approvalStatus: "approved",
      tags: [c.category, "Actionable", "Checklist"],
    });
  }

  console.log(`Inserting ${allResources.length} resources...`);
  await LearningResource.insertMany(allResources);

  console.log("Successfully seeded Learning Resources!");
  process.exit(0);
};

seed().catch(err => {
  console.error("Failed to seed:", err);
  process.exit(1);
});
