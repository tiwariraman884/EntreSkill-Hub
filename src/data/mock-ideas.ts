export type BusinessIdea = {
  id: string;
  title: string;
  category: string;
  investment: { min: number; max: number };
  expectedMonthlyIncome: { min: number; max: number };
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeToStart: string;
  aiMatchScore: number; // 0-100
  shortDescription: string;
  requiredSkills: string[];
  coverImage: string;
  // Detail Page Data
  overview: string;
  whyThisBusiness: string[];
  marketDemand: string;
  targetCustomers: string[];
  requiredTools: string[];
  revenueModel: string;
  risks: string[];
  successTips: string[];
  realExamples: string[];
  roadmapId: string;
  createdAt: string; // ISO date string
  popular: boolean;
};

export const MOCK_IDEAS: BusinessIdea[] = [
  {
    id: "idea-1",
    title: "Cloud Kitchen",
    category: "Food & Beverage",
    investment: { min: 200000, max: 500000 },
    expectedMonthlyIncome: { min: 50000, max: 150000 },
    difficulty: "Intermediate",
    timeToStart: "4-6 weeks",
    aiMatchScore: 92,
    shortDescription: "Start a delivery-only restaurant utilizing food delivery apps to reach customers without the overhead of a dine-in space.",
    requiredSkills: ["Cooking/Menu Planning", "Operations Management", "Basic Marketing"],
    coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    overview: "A cloud kitchen (or ghost kitchen) is a commercial facility purpose-built to produce food specifically for delivery. They have no physical dining space.",
    whyThisBusiness: ["Lower overhead costs than a traditional restaurant", "High demand for food delivery", "Ability to experiment with multiple brands/menus from one kitchen"],
    marketDemand: "The online food delivery market in India is growing rapidly, with millions of daily orders across Zomato and Swiggy.",
    targetCustomers: ["Busy professionals", "Students", "Late-night workers", "Families ordering weekend meals"],
    requiredTools: ["Commercial Kitchen Equipment", "FSSAI License", "POS System", "Packaging materials", "Delivery App Integrations"],
    revenueModel: "Direct sales via Zomato/Swiggy and direct ordering channels. Average order value ₹300 - ₹500 with a 30-40% gross margin.",
    risks: ["High competition on delivery apps", "Platform commissions (up to 25%)", "Quality control during transit"],
    successTips: ["Focus on high-quality, leak-proof packaging", "Optimize for 15-minute preparation times", "Run strategic discounts during peak hours to boost visibility"],
    realExamples: ["Faasos (Rebel Foods)", "FreshMenu", "Biryani By Kilo"],
    roadmapId: "rm-cloud-kitchen",
    createdAt: "2023-11-10T10:00:00Z",
    popular: true,
  },
  {
    id: "idea-2",
    title: "Freelance Graphic Design",
    category: "Digital Services",
    investment: { min: 50000, max: 150000 },
    expectedMonthlyIncome: { min: 30000, max: 100000 },
    difficulty: "Beginner",
    timeToStart: "1-2 weeks",
    aiMatchScore: 88,
    shortDescription: "Provide branding, social media graphics, and UI design services to businesses and individuals globally.",
    requiredSkills: ["Adobe Creative Suite", "Figma", "Visual Communication", "Client Management"],
    coverImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    overview: "Graphic design is the process of visual communication and problem-solving through the use of typography, photography, and illustration.",
    whyThisBusiness: ["High global demand", "Work from anywhere", "Very low operational costs", "Scalable to an agency model"],
    marketDemand: "Every new business needs a logo, website, and social media presence, creating continuous demand for design services.",
    targetCustomers: ["Startups", "Local small businesses", "Content creators", "Marketing agencies needing overflow capacity"],
    requiredTools: ["High-performance Laptop", "Design Software (Figma, Adobe CC)", "Portfolio Website", "Invoicing Software"],
    revenueModel: "Project-based fees (e.g., ₹15k for branding) or monthly retainers (e.g., ₹20k/month for social media graphics).",
    risks: ["Inconsistent income initially", "Scope creep on projects", "High competition from global talent on platforms like Upwork"],
    successTips: ["Niche down (e.g., 'Web3 UI Designer' or 'D2C Brand Designer')", "Build a strong Behance/Dribbble portfolio", "Always use clear contracts with revision limits"],
    realExamples: ["Individual freelancers on Upwork/Fiverr", "Boutique design studios"],
    roadmapId: "rm-freelance",
    createdAt: "2023-10-15T10:00:00Z",
    popular: true,
  },
  {
    id: "idea-3",
    title: "Mobile Repair Shop",
    category: "Retail & Repair",
    investment: { min: 100000, max: 300000 },
    expectedMonthlyIncome: { min: 40000, max: 120000 },
    difficulty: "Intermediate",
    timeToStart: "3-4 weeks",
    aiMatchScore: 75,
    shortDescription: "Offer hardware and software repair services for smartphones, tablets, and accessories in a high-footfall location.",
    requiredSkills: ["Electronics Repair", "Hardware Troubleshooting", "Customer Service", "Inventory Management"],
    coverImage: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=800",
    overview: "A mobile repair shop fixes broken screens, battery issues, water damage, and software glitches for common consumer electronics.",
    whyThisBusiness: ["Everyone owns a smartphone", "High margin on replacement parts and accessories", "Local trust beats distant service centers"],
    marketDemand: "India is the 2nd largest smartphone market globally. Accidental damages and out-of-warranty repairs provide a massive recurring market.",
    targetCustomers: ["Local residents", "College students", "Office workers with damaged devices"],
    requiredTools: ["Microscope", "Soldering Station", "Precision Screwdrivers", "Heat Gun", "Display Separator"],
    revenueModel: "Service fees + markup on spare parts. Additional revenue from selling accessories (cases, tempered glass, chargers).",
    risks: ["Damaging customer devices during repair", "Sourcing original/high-quality aftermarket parts", "Rapidly changing technology"],
    successTips: ["Offer a 'No Fix, No Fee' guarantee", "Maintain high transparency about part quality (Original vs. Compatible)", "Upsell accessories with every repair"],
    realExamples: ["Local neighborhood repair stores", "Cashify Repair (Franchise model)"],
    roadmapId: "rm-mobile-repair",
    createdAt: "2024-01-05T10:00:00Z",
    popular: false,
  },
  {
    id: "idea-4",
    title: "Organic Terrace Farming",
    category: "Agriculture",
    investment: { min: 30000, max: 100000 },
    expectedMonthlyIncome: { min: 15000, max: 50000 },
    difficulty: "Beginner",
    timeToStart: "6-8 weeks",
    aiMatchScore: 82,
    shortDescription: "Grow organic vegetables, herbs, and microgreens on urban rooftops to sell to local households and restaurants.",
    requiredSkills: ["Horticulture Basics", "Pest Management", "Composting", "Local B2B Sales"],
    coverImage: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e9ce?auto=format&fit=crop&q=80&w=800",
    overview: "Utilize unused urban terrace spaces to cultivate chemical-free produce, focusing on high-value, fast-growing crops like exotic herbs and microgreens.",
    whyThisBusiness: ["Low startup cost", "Rising health consciousness", "Can start part-time", "Eco-friendly business model"],
    marketDemand: "Urban consumers are increasingly looking for farm-to-table, pesticide-free fresh produce and are willing to pay a premium.",
    targetCustomers: ["Health-conscious families", "Boutique cafes", "Fine dining restaurants", "Local organic stores"],
    requiredTools: ["Grow Bags/Planters", "Organic Seeds", "Soil & Compost Mix", "Drip Irrigation System", "Shade Net"],
    revenueModel: "Direct B2C subscriptions (weekly veggie baskets) and B2B wholesale to local restaurants.",
    risks: ["Pest attacks destroying crops", "Extreme weather events", "Inconsistent yields in early stages"],
    successTips: ["Start with high-margin, fast-growing crops like microgreens, basil, and cherry tomatoes", "Document the growing process on Instagram to build trust"],
    realExamples: ["Urban Kisaan", "Local terrace farmers supplying via WhatsApp groups"],
    roadmapId: "rm-organic-farming",
    createdAt: "2023-12-15T10:00:00Z",
    popular: false,
  },
  {
    id: "idea-5",
    title: "Digital Marketing Agency",
    category: "Digital Services",
    investment: { min: 20000, max: 100000 },
    expectedMonthlyIncome: { min: 50000, max: 300000 },
    difficulty: "Intermediate",
    timeToStart: "2-3 weeks",
    aiMatchScore: 95,
    shortDescription: "Help small and medium businesses grow their online presence through SEO, social media, and paid advertising.",
    requiredSkills: ["SEO", "Performance Marketing (Meta/Google Ads)", "Content Strategy", "Sales"],
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    overview: "A digital marketing agency provides strategic and operational support to businesses wanting to acquire customers online.",
    whyThisBusiness: ["Highly scalable", "High profit margins", "Recurring revenue model", "Strong demand across all industries"],
    marketDemand: "Every traditional business is transitioning online, and they lack the in-house expertise to run profitable campaigns.",
    targetCustomers: ["Local doctors/clinics", "Real estate developers", "E-commerce brands", "SaaS companies"],
    requiredTools: ["Laptop", "SEO Tools (Ahrefs/Semrush)", "Canva/Figma", "Social Media Scheduler (Buffer/Hootsuite)"],
    revenueModel: "Monthly retainers per client (₹15k - ₹50k+) plus a percentage of the ad spend managed.",
    risks: ["Client churn if ROI isn't delivered quickly", "Algorithm changes destroying strategies", "Cash flow issues if clients delay payments"],
    successTips: ["Niche down strictly (e.g., 'Google Ads for Dentists' instead of 'Marketing for Everyone')", "Under-promise and over-deliver on reporting"],
    realExamples: ["Schbang", "Social Panga", "Thousands of boutique niche agencies"],
    roadmapId: "rm-digital-marketing",
    createdAt: "2024-02-01T10:00:00Z",
    popular: true,
  },
  {
    id: "idea-6",
    title: "Boutique Bakery",
    category: "Food & Beverage",
    investment: { min: 300000, max: 1000000 },
    expectedMonthlyIncome: { min: 60000, max: 200000 },
    difficulty: "Advanced",
    timeToStart: "6-10 weeks",
    aiMatchScore: 70,
    shortDescription: "A specialized bakery offering artisanal breads, custom cakes, and premium pastries.",
    requiredSkills: ["Baking & Pastry Arts", "Inventory Management", "Customer Experience", "Local Marketing"],
    coverImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800",
    overview: "A premium bakery focusing on high-quality, handcrafted baked goods rather than mass-produced items.",
    whyThisBusiness: ["High margins on custom products (wedding cakes)", "Strong local community integration", "Visual products excel on social media"],
    marketDemand: "Rising disposable incomes have increased demand for premium, aesthetic, and hygienic baked goods.",
    targetCustomers: ["Local families", "Event planners", "Corporate offices", "Cafes looking for wholesale suppliers"],
    requiredTools: ["Commercial Ovens", "Spiral Mixers", "Display Chillers", "POS System", "FSSAI License"],
    revenueModel: "Retail walk-in sales, custom orders for events (birthdays/weddings), and wholesale to local coffee shops.",
    risks: ["High perishable inventory waste", "Significant upfront capital required", "Finding and retaining skilled bakers"],
    successTips: ["Focus heavily on Instagram aesthetics", "Build a 'hero' signature product", "Offer eggless and gluten-free options"],
    realExamples: ["Theobroma", "Magnolia Bakery", "Local artisanal patisseries"],
    roadmapId: "rm-bakery",
    createdAt: "2023-11-20T10:00:00Z",
    popular: true,
  }
];

// Curated real Unsplash photo IDs for each generated business idea title
const IDEA_COVER_IMAGES: Record<string, string> = {
  "Tuition Center": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
  "Handmade Soap Business": "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=800",
  "Car Washing Service": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800",
  "Fitness Coaching": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
  "Pet Grooming": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
  "Event Planning": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
  "Dropshipping Store": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
  "Content Creation/Vlogging": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800",
  "Interior Design Consultation": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
  "Translation Services": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  "Virtual Assistant": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
  "App Development Agency": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
  "Home Cleaning Services": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
  "Catering Service": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
  "Yoga Studio": "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800",
  "Podcast Production": "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
  "Resume Writing Service": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800",
  "Social Media Management": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
  "Affiliate Marketing": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=800",
  "3D Printing Services": "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800",
  "Custom Apparel": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
  "Tour Guide Services": "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800",
  "Data Entry Services": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  "Photography Studio": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
};

// Generate 24 more ideas programmatically to hit the 30 requirement efficiently for the demo
const categories = ["Technology", "Education", "Health & Wellness", "E-commerce", "Local Services"];
const difficulties: Array<"Beginner" | "Intermediate" | "Advanced"> = ["Beginner", "Intermediate", "Advanced"];
const sampleTitles = [
  "Tuition Center", "Handmade Soap Business", "Car Washing Service", "Fitness Coaching",
  "Pet Grooming", "Event Planning", "Dropshipping Store", "Content Creation/Vlogging",
  "Interior Design Consultation", "Translation Services", "Virtual Assistant", "App Development Agency",
  "Home Cleaning Services", "Catering Service", "Yoga Studio", "Podcast Production",
  "Resume Writing Service", "Social Media Management", "Affiliate Marketing", "3D Printing Services",
  "Custom Apparel", "Tour Guide Services", "Data Entry Services", "Photography Studio"
];

const generatedIdeas: BusinessIdea[] = sampleTitles.map((title, index) => ({
  id: `idea-gen-${index + 7}`,
  title,
  category: categories[index % categories.length],
  investment: { min: 10000 + (index * 5000), max: 50000 + (index * 20000) },
  expectedMonthlyIncome: { min: 20000 + (index * 2000), max: 80000 + (index * 5000) },
  difficulty: difficulties[index % difficulties.length],
  timeToStart: "2-4 weeks",
  aiMatchScore: Math.floor(Math.random() * (98 - 65 + 1)) + 65,
  shortDescription: `Start a successful ${title.toLowerCase()} business with the right strategy and execution. Tap into growing market demand.`,
  requiredSkills: ["Communication", "Basic Finance", "Sales"],
  coverImage: IDEA_COVER_IMAGES[title] || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
  overview: `The ${title.toLowerCase()} industry is seeing massive growth. This business involves providing high-quality services or products to a targeted local or online audience.`,
  whyThisBusiness: ["Scalable", "In-demand", "Low barrier to entry"],
  marketDemand: "Steady year-on-year growth driven by changing consumer behaviors.",
  targetCustomers: ["Professionals", "Small Businesses", "Local Residents"],
  requiredTools: ["Laptop", "Industry specific tools", "Marketing budget"],
  revenueModel: "Direct sales or service contracts with a healthy 30-50% gross margin.",
  risks: ["Market competition", "Customer acquisition costs"],
  successTips: ["Build a strong brand", "Focus on customer retention", "Leverage word of mouth"],
  realExamples: ["Various successful local and online startups"],
  roadmapId: "rm-generic",
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  popular: index % 4 === 0,
}));

export const ALL_IDEAS = [...MOCK_IDEAS, ...generatedIdeas];
