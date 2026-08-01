"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Star,
  Search,
  MapPin,
  Globe,
  Briefcase,
  Heart,
  CheckCircle,
  CalendarDays,
  Video,
  Phone,
  Clock,
  SlidersHorizontal,
  X,
  Users,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// MOCK DATA START
const DEMO_MENTORS = [
  {
    mentorId: "m1",
    userId: "u1",
    profileImage: "https://i.pravatar.cc/150?u=a",
    name: "Aarav Mehta",
    designation: "Founder",
    company: "ScaleForge AI",
    experience: 12,
    location: "Bengaluru",
    expertise: ["Startup Validation", "AI & ML", "Fundraising"],
    languages: ["English", "Hindi"],
    availability: "Available Today",
    rating: 4.9,
    reviews: [
      { reviewer: "Karan D.", rating: 5, date: "2023-10-12", comment: "The mentorship helped us validate our MVP and secure our first paying customers." },
      { reviewer: "Neha S.", rating: 5, date: "2023-09-04", comment: "Aarav's insights into AI architectures saved us months of development time." },
    ],
    bio: "Serial entrepreneur with 12 years of experience building and scaling B2B SaaS. Raised $10M+ in venture capital.",
    skills: ["Pitch Deck", "Go-to-Market", "Leadership"],
    verified: true,
    sessionFee: "Free",
    responseTime: "2 hours",
    successRate: "95%",
    industry: "SaaS",
    bookedSessions: 142,
    featured: true,
  },
  {
    mentorId: "m2",
    userId: "u2",
    profileImage: "https://i.pravatar.cc/150?u=b",
    name: "Priya Sharma",
    designation: "Product Director",
    company: "Razorpay",
    experience: 10,
    location: "Bengaluru",
    expertise: ["Product Development", "FinTech", "MVP"],
    languages: ["English", "Tamil"],
    availability: "This Week",
    rating: 4.8,
    reviews: [
      { reviewer: "Rahul M.", rating: 5, date: "2023-11-20", comment: "Priya has deep knowledge of the fintech ecosystem. Highly recommended!" },
    ],
    bio: "Product leader specialized in financial technologies. Passionate about helping early-stage founders find product-market fit.",
    skills: ["Product Management", "Roadmapping", "UX"],
    verified: true,
    sessionFee: "$50/hr",
    responseTime: "1 day",
    successRate: "92%",
    industry: "FinTech",
    bookedSessions: 320,
    featured: true,
  },
  {
    mentorId: "m3",
    userId: "u3",
    profileImage: "https://i.pravatar.cc/150?u=c",
    name: "Rohan Kapoor",
    designation: "Startup Advisor",
    company: "Ex-Microsoft",
    experience: 15,
    location: "Delhi NCR",
    expertise: ["Sales", "Operations", "Leadership"],
    languages: ["English", "Hindi", "Punjabi"],
    availability: "Next Week",
    rating: 5.0,
    reviews: [
      { reviewer: "Siddharth J.", rating: 5, date: "2023-12-01", comment: "Rohan's enterprise sales strategy was exactly what we needed." },
    ],
    bio: "Former enterprise sales director at Microsoft. Now dedicated to helping B2B startups crack their first $1M ARR.",
    skills: ["Enterprise Sales", "B2B", "Negotiation"],
    verified: true,
    sessionFee: "$100/hr",
    responseTime: "4 hours",
    successRate: "98%",
    industry: "SaaS",
    bookedSessions: 410,
    featured: false,
  },
  {
    mentorId: "m4",
    userId: "u4",
    profileImage: "https://i.pravatar.cc/150?u=d",
    name: "Ananya Iyer",
    designation: "Growth Consultant",
    company: "Ex-Flipkart",
    experience: 8,
    location: "Mumbai",
    expertise: ["Marketing", "E-Commerce", "Growth"],
    languages: ["English", "Marathi"],
    availability: "Available Today",
    rating: 4.7,
    reviews: [
      { reviewer: "Sneha P.", rating: 4, date: "2023-08-15", comment: "Ananya gave us actionable performance marketing tips." },
    ],
    bio: "Growth marketer with a track record of scaling consumer brands from 0 to 1.",
    skills: ["Performance Marketing", "SEO", "Branding"],
    verified: true,
    sessionFee: "Free",
    responseTime: "1 hour",
    successRate: "89%",
    industry: "E-Commerce",
    bookedSessions: 89,
    featured: false,
  },
  {
    mentorId: "m5",
    userId: "u5",
    profileImage: "https://i.pravatar.cc/150?u=e",
    name: "Vikram Nair",
    designation: "Founder",
    company: "HealthTech Solutions",
    experience: 14,
    location: "Chennai",
    expertise: ["Healthcare", "Product Development", "Fundraising"],
    languages: ["English", "Malayalam"],
    availability: "This Week",
    rating: 4.9,
    reviews: [
      { reviewer: "Dr. Ahmed", rating: 5, date: "2024-01-10", comment: "Vikram's knowledge of compliance and healthcare tech is unmatched." },
    ],
    bio: "Building the future of digital health. Mentoring startups navigating the complex healthcare regulatory landscape.",
    skills: ["Compliance", "Go-to-Market", "HealthTech"],
    verified: true,
    sessionFee: "$75/hr",
    responseTime: "12 hours",
    successRate: "94%",
    industry: "Healthcare",
    bookedSessions: 205,
    featured: false,
  },
  {
    mentorId: "m6",
    userId: "u6",
    profileImage: "https://i.pravatar.cc/150?u=f",
    name: "Neha Gupta",
    designation: "Brand Strategist",
    company: "Studio Bold",
    experience: 9,
    location: "Pune",
    expertise: ["Branding", "Design", "Marketing"],
    languages: ["English", "Hindi"],
    availability: "Next Week",
    rating: 4.8,
    reviews: [
      { reviewer: "Amit T.", rating: 5, date: "2023-11-05", comment: "Neha redefined our brand voice. Absolute game changer." },
    ],
    bio: "Award-winning designer helping startups establish a powerful and consistent brand identity.",
    skills: ["UI/UX", "Brand Voice", "Content Strategy"],
    verified: true,
    sessionFee: "$60/hr",
    responseTime: "2 days",
    successRate: "91%",
    industry: "SaaS",
    bookedSessions: 130,
    featured: false,
  },
  {
    mentorId: "m7",
    userId: "u7",
    profileImage: "https://i.pravatar.cc/150?u=g",
    name: "Aditya Verma",
    designation: "AI Engineer",
    company: "DeepMind Alpha",
    experience: 6,
    location: "Hyderabad",
    expertise: ["AI & ML", "Web Development", "No-Code"],
    languages: ["English", "Telugu"],
    availability: "Available Today",
    rating: 4.6,
    reviews: [
      { reviewer: "Vinay K.", rating: 4, date: "2023-12-20", comment: "Aditya is highly technical and helped debug our LLM integration." },
    ],
    bio: "Passionate about making AI accessible. Mentoring technical founders on robust system design.",
    skills: ["Python", "LLMs", "System Design"],
    verified: true,
    sessionFee: "Free",
    responseTime: "30 mins",
    successRate: "88%",
    industry: "EdTech",
    bookedSessions: 75,
    featured: false,
  },
  {
    mentorId: "m8",
    userId: "u8",
    profileImage: "https://i.pravatar.cc/150?u=h",
    name: "Sakshi Jain",
    designation: "Investment Advisor",
    company: "Venture Partners",
    experience: 11,
    location: "Bengaluru",
    expertise: ["Finance", "Fundraising", "Legal"],
    languages: ["English", "Hindi"],
    availability: "This Week",
    rating: 4.9,
    reviews: [
      { reviewer: "Meera R.", rating: 5, date: "2024-01-05", comment: "Sakshi's advice on term sheets saved us from a bad deal." },
    ],
    bio: "Ex-VC turned advisor. I help founders understand the math behind valuations and term sheets.",
    skills: ["Financial Modeling", "Term Sheets", "M&A"],
    verified: true,
    sessionFee: "$150/hr",
    responseTime: "24 hours",
    successRate: "97%",
    industry: "FinTech",
    bookedSessions: 290,
    featured: true,
  },
];

const EXPERTISE_OPTIONS = ["All", "Startup Validation", "Product Development", "AI & ML", "Web Development", "Mobile Apps", "Marketing", "Branding", "Sales", "Fundraising", "Finance", "Operations", "Legal"];
const AVAILABILITY_OPTIONS = ["All", "Available This Week", "Weekend Only", "Weekdays"];
const SORT_OPTIONS = ["Highest Rated", "Most Experienced", "Most Sessions"];
// MOCK DATA END

type MentorType = typeof DEMO_MENTORS[0];

const StatsPill = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5">
    <span className="text-white font-bold text-sm tracking-tight">{value}</span>
    <span className="text-white/70 text-xs font-medium">{label}</span>
  </div>
);

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("Highest Rated");
  const [showFilters, setShowFilters] = useState(false);

  const [selectedProfile, setSelectedProfile] = useState<MentorType | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const filteredMentors = useMemo(() => {
    return DEMO_MENTORS.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesExpertise = selectedExpertise === "All" || m.expertise.includes(selectedExpertise);
      const matchesIndustry = selectedIndustry === "All" || m.industry === selectedIndustry;
      const matchesAvailability = selectedAvailability === "All" || m.availability === selectedAvailability;

      return matchesSearch && matchesExpertise && matchesIndustry && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === "Highest Rated") return b.rating - a.rating;
      if (sortBy === "Most Experienced") return b.experience - a.experience;
      if (sortBy === "Most Sessions") return b.bookedSessions - a.bookedSessions;
      return 0;
    });
  }, [searchQuery, selectedExpertise, selectedIndustry, selectedAvailability, sortBy]);

  const featuredMentors = filteredMentors.filter((m) => m.featured);
  const regularMentors = filteredMentors.filter((m) => !m.featured);

  const handleBookSession = (mentor: MentorType) => {
    setSelectedProfile(mentor);
    setBookingStep(1);
    setIsBookingModalOpen(true);
  };

  const confirmBooking = () => {
    setBookingStep(2);
    setTimeout(() => {
      setIsBookingModalOpen(false);
      toast.success(`Session booked with ${selectedProfile?.name}!`);
    }, 1500);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedExpertise("All");
    setSelectedIndustry("All");
    setSelectedAvailability("All");
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "size-3.5",
          i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-white/20"
        )}
      />
    ));

  const MentorCard = ({ mentor, index: _index }: { mentor: typeof DEMO_MENTORS[0]; index: number }) => (
    <div
    >
      <Card hoverable glow={mentor.featured} className="border-border/40 bg-surface-elevated overflow-hidden">
        <CardHeader className="relative pb-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <Avatar size="lg" className="transition-transform duration-500 group-hover/card:scale-105">
                <AvatarImage src={mentor.profileImage} alt={mentor.name} />
                <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              {mentor.verified && (
                <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-linear-to-br from-indigo to-indigo-light rounded-full flex items-center justify-center ring-2 ring-surface-elevated shadow-sm">
                  <CheckCircle className="size-3 text-white" />
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold leading-tight truncate">
                {mentor.name}
              </CardTitle>
              <p className="text-xs text-thread mt-0.5 truncate font-medium">
                {mentor.designation} · {mentor.company}
              </p>
              <div className="flex items-center gap-3 text-xs text-thread mt-1.5">
                <span className="flex items-center gap-1">
                  <Briefcase className="size-3" /> {mentor.experience} Yrs
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" /> {mentor.location}
                </span>
              </div>
            </div>
          </div>
          <button
            className="absolute top-0 right-0 text-thread hover:text-danger transition-colors p-1.5 hover:bg-danger/10 rounded-lg"
            aria-label="Save mentor"
          >
            <Heart className="size-4" />
          </button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-3">
          <p className="text-sm text-thread leading-relaxed line-clamp-2">{mentor.bio}</p>

          <div className="flex flex-wrap gap-1.5">
            {mentor.expertise.slice(0, 3).map((exp) => (
              <Badge key={exp} variant="outline" className="text-[10px] font-semibold tracking-wide uppercase border-indigo/20 text-indigo">
                {exp}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-thread">
            <span className="flex items-center gap-1">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse" />
                <span className="absolute inset-0 rounded-full bg-emerald-400/50 animate-ping" />
              </span>
              {mentor.availability}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" /> {mentor.responseTime}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex items-center gap-1">
              <Star className="size-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-sm">{mentor.rating}</span>
              <span className="text-xs text-thread">({mentor.bookedSessions} sessions)</span>
            </div>
            <div className="text-xs font-bold px-3 py-1.5 rounded-lg bg-linear-to-r from-indigo to-indigo-light text-white shadow-sm shadow-indigo/20">
              {mentor.sessionFee}
            </div>
          </div>
        </CardContent>

        <CardFooter className="gap-2 pt-0">
          <Button
            variant="outline"
            className="flex-1 border-indigo/20 hover:bg-indigo/5 text-xs"
            onClick={() => { setSelectedProfile(mentor); setIsProfileModalOpen(true); }}
          >
            View Profile
          </Button>
          <Button
            className="flex-1 text-xs"
            onClick={() => handleBookSession(mentor)}
          >
            Book Session
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas pb-20">
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-linear-to-br from-indigo via-indigo-light to-indigo-dark py-16 lg:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(232,163,61,0.15),_transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-5 tracking-tight text-white"
          >
            Learn from founders who&apos;ve done it
          </h1>
          <p
            className="text-lg text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            Book 1:1 sessions with verified mentors. Get personalized guidance on your startup journey.
          </p>

          <div
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <StatsPill value="Verified Mentors" label="Verified Mentors" />
            <StatsPill value="Avg Rating 4.9" label="Avg Rating 4.9" />
            <StatsPill value="500+ Sessions" label="500+ Sessions" />
            <StatsPill value="94% Satisfaction" label="94% Satisfaction" />
          </div>

          <div
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-indigo hover:bg-white/90 shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => document.getElementById("mentor-grid")?.scrollIntoView({ behavior: "smooth" })}
            >
              Find a Mentor
            </Button>
            <Link
              href="/register"
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-xl border-2 px-8 text-lg font-semibold transition-all duration-300",
                "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              )}
            >
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* AI MATCHING BANNER */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20"
      >
        <Card className="rounded-3xl overflow-hidden border-0 shadow-premium">
          <div className="bg-linear-to-r from-indigo to-indigo-light p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Sparkles className="size-6 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-heading font-semibold text-white mb-1">AI Mentor Matching</h3>
              <p className="text-sm text-white/75 leading-relaxed max-w-xl">
                Our AI analyzes your goals, skills, and learning style to recommend the perfect mentor for you.
              </p>
            </div>
            <Button
              className="shrink-0 bg-white text-indigo hover:bg-white/90 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Sparkles className="size-4 mr-2" />
              Get AI Match
            </Button>
          </div>
        </Card>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        {/* FILTERS */}
        <div
          className="bg-surface-elevated rounded-2xl border border-border/40 shadow-premium p-4 mb-14 sticky top-6 z-10"
        >
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-thread" />
              <Input
                placeholder="Search mentors by name, startup, expertise or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden text-indigo hover:bg-indigo/5"
              >
                <SlidersHorizontal className="size-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <div className={cn("flex flex-wrap items-center gap-2", showFilters ? "flex" : "hidden lg:flex")}>
                <Select value={selectedExpertise} onValueChange={(val) => setSelectedExpertise(val || "All")}>
                  <SelectTrigger className="w-40 border-indigo/20 hover:border-indigo/40">
                    <SelectValue placeholder="Expertise" />
                  </SelectTrigger>
                  <SelectContent>{EXPERTISE_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>

                <Select value={selectedAvailability} onValueChange={(val) => setSelectedAvailability(val || "All")}>
                  <SelectTrigger className="w-40 border-indigo/20 hover:border-indigo/40">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>{AVAILABILITY_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(val) => setSortBy(val || "Highest Rated")}>
                  <SelectTrigger className="w-40 border-indigo/20 hover:border-indigo/40">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>{SORT_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                </Select>

                {(selectedExpertise !== "All" || selectedAvailability !== "All") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-danger hover:text-danger hover:bg-danger/10"
                  >
                    <X className="size-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MENTOR GRID */}
        <div
          id="mentor-grid"
          className="scroll-mt-28"
        >
          {filteredMentors.length === 0 ? (
            <EmptyState
              icon="search"
              title="No mentors match your filters"
              description="Try adjusting your search criteria or filters to find the right mentor for you."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          ) : (
            <div className="space-y-16">
              {featuredMentors.length > 0 && (
                <section>
                  <div
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-marigold to-marigold-light flex items-center justify-center shadow-lg shadow-marigold/20">
                      <Star className="size-5 text-white fill-current" />
                    </div>
                    <h2 className="text-xl font-heading font-bold">Featured Mentors</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredMentors.map((m, i) => <MentorCard key={m.mentorId} mentor={m} index={i} />)}
                  </div>
                </section>
              )}

              {regularMentors.length > 0 && (
                <section>
                  <div
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo to-indigo-light flex items-center justify-center shadow-lg shadow-indigo/20">
                      <Users className="size-5 text-white" />
                    </div>
                    <h2 className="text-xl font-heading font-bold">All Mentors</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularMentors.map((m, i) => <MentorCard key={m.mentorId} mentor={m} index={i} />)}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </main>

      {/* PROFILE MODAL */}
      {selectedProfile && (
        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0 rounded-3xl shadow-2xl">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative shrink-0">
                  <Avatar size="xl" className="border-4 border-indigo/10">
                    <AvatarImage src={selectedProfile.profileImage} alt={selectedProfile.name} />
                    <AvatarFallback>{selectedProfile.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {selectedProfile.verified && (
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-linear-to-br from-indigo to-indigo-light rounded-full flex items-center justify-center ring-2 ring-surface-elevated">
                      <CheckCircle className="size-4 text-white" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-2xl font-heading font-bold flex items-center gap-2">
                    {selectedProfile.name}
                  </DialogTitle>
                  <p className="text-base text-thread font-medium mt-1">
                    {selectedProfile.designation} at {selectedProfile.company}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-thread mt-4">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="size-4" /> {selectedProfile.experience} Years Exp.
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" /> {selectedProfile.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Globe className="size-4" /> {selectedProfile.languages.join(", ")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-linear-to-br from-indigo/5 to-indigo-light/5 p-4 rounded-2xl border border-indigo/10">
                    <div>
                      <div className="text-xs text-thread font-medium mb-0.5">Rating</div>
                      <div className="font-bold flex items-center gap-1">
                        <Star className="size-4 text-amber-400 fill-amber-400" />
                        {selectedProfile.rating}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-thread font-medium mb-0.5">Sessions</div>
                      <div className="font-bold">{selectedProfile.bookedSessions}</div>
                    </div>
                    <div>
                      <div className="text-xs text-thread font-medium mb-0.5">Response</div>
                      <div className="font-bold">{selectedProfile.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-xs text-thread font-medium mb-0.5">Fee</div>
                      <div className="font-bold text-emerald-400">{selectedProfile.sessionFee}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-8">
                <div>
                  <h3 className="text-base font-heading font-semibold mb-3 pb-2 border-b border-border/40">About</h3>
                  <p className="text-sm text-thread leading-relaxed">{selectedProfile.bio}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base font-heading font-semibold mb-3 pb-2 border-b border-border/40">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.expertise.map((e: string) => (
                        <Badge key={e} variant="secondary" className="bg-indigo/10 text-indigo text-xs">{e}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-semibold mb-3 pb-2 border-b border-border/40">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.skills.map((s: string) => (
                        <Badge key={s} variant="outline" className="border-indigo/20 text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-heading font-semibold mb-4 pb-2 border-b border-border/40">Recent Reviews</h3>
                  <div className="space-y-3">
                    {selectedProfile.reviews.map((rev: MentorType["reviews"][0], idx: number) => (
                      <div key={idx} className="bg-linear-to-br from-indigo/5 to-indigo-light/5 rounded-xl p-4 border border-indigo/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{rev.reviewer}</span>
                          <span className="text-xs text-thread">{rev.date}</span>
                        </div>
                        <div className="flex gap-0.5 mb-2">{renderStars(rev.rating)}</div>
                        <p className="text-sm text-thread italic leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="p-4 sm:p-6 border-t border-border/40 flex-row justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsProfileModalOpen(false)}
                className="border-indigo/20 hover:bg-indigo/5"
              >
                Close
              </Button>
              <Button
                onClick={() => { setIsProfileModalOpen(false); handleBookSession(selectedProfile); }}
                className="bg-linear-to-r from-indigo to-indigo-light shadow-md shadow-indigo/20"
              >
                Book Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* BOOKING MODAL */}
      {selectedProfile && (
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent className="sm:max-w-106.25 rounded-3xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">Book a Session</DialogTitle>
              <DialogDescription>
                Schedule time with {selectedProfile.name}
              </DialogDescription>
            </DialogHeader>

            {bookingStep === 1 ? (
              <div className="py-4 space-y-6">
                <div className="flex items-center gap-4 bg-linear-to-br from-indigo/5 to-indigo-light/5 p-3 rounded-2xl border border-indigo/10">
                  <Avatar size="lg">
                    <AvatarImage src={selectedProfile.profileImage} alt={selectedProfile.name} />
                    <AvatarFallback>{selectedProfile.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{selectedProfile.name}</div>
                    <div className="text-xs text-thread font-medium">{selectedProfile.sessionFee} · 30 mins</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Select Date & Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start border-indigo/20 hover:bg-indigo/5">
                      <CalendarDays className="mr-2 size-4" /> Today
                    </Button>
                    <Button variant="outline" className="justify-start border-indigo/20 hover:bg-indigo/5">
                      <CalendarDays className="mr-2 size-4" /> Tomorrow
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button variant="outline" size="sm" className="border-indigo/20 hover:bg-indigo/5">10:00 AM</Button>
                    <Button variant="outline" size="sm" className="border-indigo/20 hover:bg-indigo/5">02:30 PM</Button>
                    <Button variant="outline" size="sm" className="border-indigo/20 hover:bg-indigo/5">04:00 PM</Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Meeting Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start bg-indigo/5 border-indigo text-indigo">
                      <Video className="mr-2 size-4" /> Google Meet
                    </Button>
                    <Button variant="outline" className="justify-start border-indigo/20 hover:bg-indigo/5">
                      <Phone className="mr-2 size-4" /> Phone Call
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Message to Mentor (Optional)</label>
                  <textarea
                    className="w-full p-3 text-sm border-2 border-indigo/20 rounded-xl bg-transparent outline-none focus:border-indigo transition-all min-h-20"
                    placeholder="Briefly describe what you'd like to discuss..."
                  />
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="size-16 bg-linear-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/25">
                  <CheckCircle className="size-8" />
                </div>
                <h3 className="text-xl font-heading font-bold">Booking Confirmed!</h3>
                <p className="text-sm text-thread max-w-62.5">
                  An invitation has been sent to your email. See you at the session!
                </p>
              </div>
            )}

            <DialogFooter>
              {bookingStep === 1 && (
                <div className="flex w-full gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-indigo/20 hover:bg-indigo/5"
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmBooking}
                    className="flex-1 bg-linear-to-r from-indigo to-indigo-light shadow-md shadow-indigo/20"
                  >
                    Confirm Booking
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
