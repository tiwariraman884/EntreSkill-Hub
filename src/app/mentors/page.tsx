"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, Search, MapPin, Globe, Briefcase, Heart, 
  CheckCircle, CalendarDays, Video, Phone
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
      { reviewer: "Neha S.", rating: 5, date: "2023-09-04", comment: "Aarav’s insights into AI architectures saved us months of development time." }
    ],
    bio: "Serial entrepreneur with 12 years of experience building and scaling B2B SaaS. Raised $10M+ in venture capital.",
    skills: ["Pitch Deck", "Go-to-Market", "Leadership"],
    verified: true,
    sessionFee: "Free",
    responseTime: "2 hours",
    successRate: "95%",
    industry: "SaaS",
    bookedSessions: 142,
    featured: true
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
      { reviewer: "Rahul M.", rating: 5, date: "2023-11-20", comment: "Priya has deep knowledge of the fintech ecosystem. Highly recommended!" }
    ],
    bio: "Product leader specialized in financial technologies. Passionate about helping early-stage founders find product-market fit.",
    skills: ["Product Management", "Roadmapping", "UX"],
    verified: true,
    sessionFee: "$50/hr",
    responseTime: "1 day",
    successRate: "92%",
    industry: "FinTech",
    bookedSessions: 320,
    featured: true
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
      { reviewer: "Siddharth J.", rating: 5, date: "2023-12-01", comment: "Rohan's enterprise sales strategy was exactly what we needed." }
    ],
    bio: "Former enterprise sales director at Microsoft. Now dedicated to helping B2B startups crack their first $1M ARR.",
    skills: ["Enterprise Sales", "B2B", "Negotiation"],
    verified: true,
    sessionFee: "$100/hr",
    responseTime: "4 hours",
    successRate: "98%",
    industry: "SaaS",
    bookedSessions: 410,
    featured: false
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
      { reviewer: "Sneha P.", rating: 4, date: "2023-08-15", comment: "Ananya gave us actionable performance marketing tips." }
    ],
    bio: "Growth marketer with a track record of scaling consumer brands from 0 to 1.",
    skills: ["Performance Marketing", "SEO", "Branding"],
    verified: true,
    sessionFee: "Free",
    responseTime: "1 hour",
    successRate: "89%",
    industry: "E-Commerce",
    bookedSessions: 89,
    featured: false
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
      { reviewer: "Dr. Ahmed", rating: 5, date: "2024-01-10", comment: "Vikram's knowledge of compliance and healthcare tech is unmatched." }
    ],
    bio: "Building the future of digital health. Mentoring startups navigating the complex healthcare regulatory landscape.",
    skills: ["Compliance", "Go-to-Market", "HealthTech"],
    verified: true,
    sessionFee: "$75/hr",
    responseTime: "12 hours",
    successRate: "94%",
    industry: "Healthcare",
    bookedSessions: 205,
    featured: false
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
      { reviewer: "Amit T.", rating: 5, date: "2023-11-05", comment: "Neha redefined our brand voice. Absolute game changer." }
    ],
    bio: "Award-winning designer helping startups establish a powerful and consistent brand identity.",
    skills: ["UI/UX", "Brand Voice", "Content Strategy"],
    verified: true,
    sessionFee: "$60/hr",
    responseTime: "2 days",
    successRate: "91%",
    industry: "SaaS",
    bookedSessions: 130,
    featured: false
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
      { reviewer: "Vinay K.", rating: 4, date: "2023-12-20", comment: "Aditya is highly technical and helped debug our LLM integration." }
    ],
    bio: "Passionate about making AI accessible. Mentoring technical founders on robust system design.",
    skills: ["Python", "LLMs", "System Design"],
    verified: true,
    sessionFee: "Free",
    responseTime: "30 mins",
    successRate: "88%",
    industry: "EdTech",
    bookedSessions: 75,
    featured: false
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
      { reviewer: "Meera R.", rating: 5, date: "2024-01-05", comment: "Sakshi's advice on term sheets saved us from a bad deal." }
    ],
    bio: "Ex-VC turned advisor. I help founders understand the math behind valuations and term sheets.",
    skills: ["Financial Modeling", "Term Sheets", "M&A"],
    verified: true,
    sessionFee: "$150/hr",
    responseTime: "24 hours",
    successRate: "97%",
    industry: "FinTech",
    bookedSessions: 290,
    featured: true
  }
];

const EXPERTISE_OPTIONS = ["All", "Startup Validation", "Product Development", "AI & ML", "Web Development", "Mobile Apps", "Marketing", "Branding", "Sales", "Fundraising", "Finance", "Operations", "Legal"];
const INDUSTRY_OPTIONS = ["All", "SaaS", "Healthcare", "FinTech", "AgriTech", "EdTech", "E-Commerce", "Manufacturing", "Sustainability"];
const AVAILABILITY_OPTIONS = ["All", "Available Today", "This Week", "Next Week"];
const SORT_OPTIONS = ["Highest Rated", "Most Experienced", "Most Sessions"];
// MOCK DATA END

type MentorType = typeof DEMO_MENTORS[0];

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("Highest Rated");

  const [selectedProfile, setSelectedProfile] = useState<MentorType | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  // Derived state
  const filteredMentors = useMemo(() => {
    return DEMO_MENTORS.filter((m) => {
      const matchesSearch = 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
      
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

  const featuredMentors = filteredMentors.filter(m => m.featured);
  const regularMentors = filteredMentors.filter(m => !m.featured);

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

  const MentorCard = ({ mentor }: { mentor: typeof DEMO_MENTORS[0] }) => (
    <Card className="flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarImage src={mentor.profileImage} alt={mentor.name} />
              <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg flex items-center gap-1.5">
                {mentor.name}
                {mentor.verified && <CheckCircle className="size-4 text-blue-500" />}
              </CardTitle>
              <p className="text-sm font-medium text-foreground">{mentor.designation} • {mentor.company}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Briefcase className="size-3" /> {mentor.experience} Yrs</span>
                <span className="flex items-center gap-1"><MapPin className="size-3" /> {mentor.location}</span>
              </div>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-red-500 transition-colors">
            <Heart className="size-5" />
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col pb-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {mentor.bio}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.expertise.slice(0, 3).map((exp) => (
            <Badge key={exp} variant="secondary" className="bg-primary/5 text-primary text-[10px] uppercase font-semibold tracking-wider hover:bg-primary/10 transition-colors">
              {exp}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between text-sm border-t pt-4">
          <div className="flex items-center gap-1 font-medium text-amber-500">
            <Star className="size-4 fill-current" />
            <span>{mentor.rating} <span className="text-muted-foreground font-normal">({mentor.reviews.length} reviews)</span></span>
          </div>
          <div className="text-xs font-medium bg-muted px-2 py-1 rounded">
            {mentor.sessionFee}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="gap-2 pt-0">
        <Button variant="outline" className="w-full text-xs" onClick={() => { setSelectedProfile(mentor); setIsProfileModalOpen(true); }}>
          View Profile
        </Button>
        <Button className="w-full text-xs" onClick={() => handleBookSession(mentor)}>
          Book Session
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* Header */}
      <div className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <h1 className="text-4xl font-heading font-bold mb-4 tracking-tight">Find a Mentor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Connect with experienced entrepreneurs who can guide you. Book 1-on-1 sessions to validate ideas, accelerate growth, and avoid common pitfalls.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-card border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-primary">128</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Verified Mentors</div>
            </div>
            <div className="bg-card border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-amber-500 flex items-center gap-1"><Star className="size-5 fill-current"/> 4.9</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Avg Rating</div>
            </div>
            <div className="bg-card border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-foreground">2,300+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Startups Guided</div>
            </div>
            <div className="bg-card border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-foreground">15,000+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Sessions Conducted</div>
            </div>
            <div className="bg-card border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-emerald-500">98%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Response Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Search & Filters */}
        <div className="bg-card border rounded-xl p-4 shadow-sm mb-12 sticky top-4 z-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search mentors by name, startup, expertise or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-transparent border rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedExpertise} onValueChange={(val) => setSelectedExpertise(val || "All")}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Expertise" /></SelectTrigger>
                <SelectContent>{EXPERTISE_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={selectedIndustry} onValueChange={(val) => setSelectedIndustry(val || "All")}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Industry" /></SelectTrigger>
                <SelectContent>{INDUSTRY_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={selectedAvailability} onValueChange={(val) => setSelectedAvailability(val || "All")}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Availability" /></SelectTrigger>
                <SelectContent>{AVAILABILITY_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(val) => setSortBy(val || "Highest Rated")}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Sort By" /></SelectTrigger>
                <SelectContent>{SORT_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {filteredMentors.length === 0 ? (
          <div className="text-center py-20 bg-card border rounded-xl border-dashed">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-muted mb-4">
              <Search className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No mentors match your search.</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search criteria.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Mentors */}
            {featuredMentors.length > 0 && (
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <Star className="size-5 text-amber-500 fill-current" /> Featured Mentors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredMentors.map(m => <MentorCard key={m.mentorId} mentor={m} />)}
                </div>
              </div>
            )}

            {/* All Mentors */}
            {regularMentors.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-6">All Mentors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {regularMentors.map(m => <MentorCard key={m.mentorId} mentor={m} />)}
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24 border-4 border-primary/10">
                  <AvatarImage src={selectedProfile.profileImage} />
                  <AvatarFallback>{selectedProfile.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    {selectedProfile.name}
                    {selectedProfile.verified && <CheckCircle className="size-5 text-blue-500" />}
                  </DialogTitle>
                  <p className="text-lg text-muted-foreground font-medium mb-4">{selectedProfile.designation} at {selectedProfile.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/80 mb-6">
                    <span className="flex items-center gap-1.5"><Briefcase className="size-4 text-muted-foreground" /> {selectedProfile.experience} Years Exp.</span>
                    <span className="flex items-center gap-1.5"><MapPin className="size-4 text-muted-foreground" /> {selectedProfile.location}</span>
                    <span className="flex items-center gap-1.5"><Globe className="size-4 text-muted-foreground" /> {selectedProfile.languages.join(", ")}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-muted/30 p-4 rounded-xl border">
                    <div>
                      <div className="text-sm text-muted-foreground font-medium">Rating</div>
                      <div className="font-bold flex items-center gap-1"><Star className="size-4 text-amber-500 fill-current"/> {selectedProfile.rating}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium">Sessions</div>
                      <div className="font-bold">{selectedProfile.bookedSessions}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium">Response</div>
                      <div className="font-bold">{selectedProfile.responseTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-medium">Fee</div>
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">{selectedProfile.sessionFee}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-3 border-b pb-2">About Me</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedProfile.bio}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-3 border-b pb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.expertise.map((e: string) => (
                        <Badge key={e} variant="secondary">{e}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 border-b pb-2">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfile.skills.map((s: string) => (
                        <Badge key={s} variant="outline">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 border-b pb-2">Recent Reviews</h3>
                  <div className="space-y-4">
                    {selectedProfile.reviews.map((rev: MentorType["reviews"][0], idx: number) => (
                      <div key={idx} className="bg-muted/30 rounded-lg p-4 border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm">{rev.reviewer}</span>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-500 mb-2">
                          {Array.from({length: rev.rating}).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
                        </div>
                        <p className="text-sm text-muted-foreground italic">&quot;{rev.comment}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="bg-background border-t p-4 sm:p-6 sticky bottom-0 z-10 flex-row justify-end gap-2">
              <Button variant="outline" onClick={() => setIsProfileModalOpen(false)}>Close</Button>
              <Button onClick={() => { setIsProfileModalOpen(false); handleBookSession(selectedProfile); }}>
                Book a Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Booking Modal */}
      {selectedProfile && (
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book a Session</DialogTitle>
              <DialogDescription>
                Schedule time with {selectedProfile.name}
              </DialogDescription>
            </DialogHeader>
            
            {bookingStep === 1 ? (
              <div className="py-4 space-y-6">
                <div className="flex items-center gap-4 bg-muted/30 p-3 rounded-lg border">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedProfile.profileImage} />
                    <AvatarFallback>{selectedProfile.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{selectedProfile.name}</div>
                    <div className="text-xs text-muted-foreground font-medium">{selectedProfile.sessionFee} • 30 mins</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Select Date & Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start"><CalendarDays className="mr-2 size-4"/> Today</Button>
                    <Button variant="outline" className="justify-start"><CalendarDays className="mr-2 size-4"/> Tomorrow</Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button variant="outline" size="sm">10:00 AM</Button>
                    <Button variant="outline" size="sm">02:30 PM</Button>
                    <Button variant="outline" size="sm">04:00 PM</Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Meeting Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start bg-primary/5 border-primary text-primary"><Video className="mr-2 size-4"/> Google Meet</Button>
                    <Button variant="outline" className="justify-start"><Phone className="mr-2 size-4"/> Phone Call</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message to Mentor (Optional)</label>
                  <textarea 
                    className="w-full p-3 text-sm border rounded-md bg-transparent outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[80px]"
                    placeholder="Briefly describe what you'd like to discuss..."
                  ></textarea>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="size-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="size-8" />
                </div>
                <h3 className="text-xl font-bold">Booking Confirmed!</h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">
                  An invitation has been sent to your email. See you at the session!
                </p>
              </div>
            )}

            <DialogFooter>
              {bookingStep === 1 && (
                <div className="flex w-full gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setIsBookingModalOpen(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={confirmBooking}>Confirm Booking</Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
