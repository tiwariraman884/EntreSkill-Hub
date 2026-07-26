"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, BookOpen, Users, Compass,
  LineChart, Sparkles, Star, Target, ShieldCheck,
  MapIcon, Video, CheckSquare, Plus, Minus,
  Scissors, Utensils, Laptop, Camera, Megaphone, Paintbrush
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Subcomponents for Sections ---

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-8 hover:bg-primary/10 transition-colors cursor-default">
          <Sparkles className="size-4" /> Introducing EntreSkill Hub 2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl font-heading text-balance">
          Convert your skills into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">successful business.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl text-balance leading-relaxed">
          The all-in-one platform for micro-entrepreneurs. Discover tailored business ideas, follow step-by-step roadmaps, and connect with industry mentors.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto text-base h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5")}>
            Start Your Journey <ArrowRight className="ml-2 size-5" />
          </Link>
          <Link href="#business-ideas" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto text-base h-14 px-8 rounded-full border-2 hover:bg-muted/50 transition-all")}>
            Explore Business Ideas
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex -space-x-3">
            {[11,12,13,14,15].map(i => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={`https://i.pravatar.cc/100?img=${i}`} alt="Community member" className="w-10 h-10 rounded-full border-2 border-background shadow-sm" />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex text-amber-500">
              {[1,2,3,4,5].map(i => <Star key={i} className="size-4 fill-current" />)}
            </div>
            <span>Trusted by 2,500+ learners</span>
          </div>
        </div>
      </div>
      
      {/* Floating Elements (Decorative) */}
      <div className="hidden lg:flex absolute left-[10%] top-[30%] bg-card p-3 rounded-xl shadow-xl border animate-bounce" style={{ animationDuration: '4s' }}>
        <Compass className="size-6 text-blue-500" />
      </div>
      <div className="hidden lg:flex absolute right-[12%] top-[25%] bg-card p-3 rounded-xl shadow-xl border animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
        <Users className="size-6 text-emerald-500" />
      </div>
      <div className="hidden lg:flex absolute right-[20%] bottom-[20%] bg-card p-3 rounded-xl shadow-xl border animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
        <MapIcon className="size-6 text-purple-500" />
      </div>
    </section>
  );
}

function ProgressTimeline() {
  const steps = ["Skill", "Idea", "Plan", "Learn", "Grow"];
  return (
    <section className="py-24 bg-muted/30 border-y relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">The Path to Entrepreneurship</p>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 -z-10"></div>
          {steps.map((step, idx) => (
            <div key={step} className="group relative flex flex-col items-center mb-8 md:mb-0 cursor-default">
              <div className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm group-hover:border-primary group-hover:bg-primary/5 transition-colors duration-300 relative z-10">
                <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">{idx + 1}</span>
              </div>
              <span className="mt-4 font-semibold text-lg">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCategories() {
  const categories = [
    { icon: <Scissors className="size-6"/>, title: "Tailoring & Boutique", earning: "₹20K–₹90K/mo", cost: "₹5K", time: "2 Weeks", diff: "Easy", color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
    { icon: <Utensils className="size-6"/>, title: "Cloud Kitchen", earning: "₹30K–₹1.5L/mo", cost: "₹10K", time: "3 Weeks", diff: "Medium", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
    { icon: <Laptop className="size-6"/>, title: "Digital Freelancing", earning: "₹25K–₹1L/mo", cost: "₹0", time: "1 Week", diff: "Easy", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    { icon: <Camera className="size-6"/>, title: "Photography", earning: "₹15K–₹80K/mo", cost: "₹15K", time: "2 Weeks", diff: "Medium", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    { icon: <Paintbrush className="size-6"/>, title: "Handmade Crafts", earning: "₹10K–₹50K/mo", cost: "₹2K", time: "1 Week", diff: "Easy", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    { icon: <Megaphone className="size-6"/>, title: "Social Media Agency", earning: "₹40K–₹2L/mo", cost: "₹0", time: "2 Weeks", diff: "Hard", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" }
  ];

  return (
    <section id="business-ideas" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Explore Business Opportunities</h2>
          <p className="text-muted-foreground text-lg">Discover curated business ideas tailored to your existing skills. We break down the costs, time, and potential earnings.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="group bg-card border rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer">
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-colors", cat.color)}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">Turn your passion into profit with step-by-step guidance tailored for this industry.</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6 bg-muted/50 p-4 rounded-xl">
                <div>
                  <div className="text-muted-foreground text-xs uppercase font-semibold mb-1">Potential Earnings</div>
                  <div className="font-bold">{cat.earning}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase font-semibold mb-1">Startup Cost</div>
                  <div className="font-medium">{cat.cost}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase font-semibold mb-1">Time to Launch</div>
                  <div className="font-medium">{cat.time}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase font-semibold mb-1">Difficulty</div>
                  <div className="font-medium">{cat.diff}</div>
                </div>
              </div>
              
              <Link href="/register" className="flex items-center justify-center w-full py-2.5 rounded-lg border-2 font-medium text-sm hover:bg-muted transition-colors group-hover:border-primary group-hover:text-primary">
                Explore Roadmap
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const features = [
    { icon: <Target className="size-6 text-blue-500"/>, title: "AI Business Recommendations", desc: "Our intelligent engine matches your unique skills with the most viable business opportunities in your local market." },
    { icon: <MapIcon className="size-6 text-emerald-500"/>, title: "Personalized Roadmaps", desc: "No more guessing. Follow a structured, step-by-step checklist from ideation to acquiring your first customer." },
    { icon: <ShieldCheck className="size-6 text-purple-500"/>, title: "Verified Mentors", desc: "Connect with vetted industry experts who have walked the path before and can help you avoid costly mistakes." },
    { icon: <LineChart className="size-6 text-amber-500"/>, title: "Progress Tracking", desc: "Stay motivated with an interactive dashboard that tracks your learning, roadmap completion, and overall growth." }
  ];

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">Why thousands choose EntreSkill Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex gap-6 p-6 bg-card rounded-2xl border hover:border-primary/50 transition-colors shadow-sm">
              <div className="w-14 h-14 shrink-0 bg-background rounded-xl border flex items-center justify-center shadow-sm">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureShowcase() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">A Workspace Built for Founders</h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
          Everything you need to plan, learn, and grow is beautifully organized in one intuitive dashboard.
        </p>
        
        {/* Abstract UI Mockup */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-border/50 bg-muted/30 p-2 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 rounded-2xl pointer-events-none h-full w-full" style={{ background: 'linear-gradient(to top, var(--background) 5%, transparent 40%)' }}></div>
          <div className="rounded-xl overflow-hidden border bg-background flex flex-col md:flex-row h-[400px] md:h-[600px] relative">
            
            {/* Mock Sidebar */}
            <div className="hidden md:flex w-64 border-r bg-muted/20 flex-col p-4 gap-2">
              <div className="h-8 w-32 bg-primary/20 rounded mb-8"></div>
              {[1,2,3,4,5].map(i => <div key={i} className="h-10 w-full bg-muted/50 rounded-lg"></div>)}
            </div>
            
            {/* Mock Main Content */}
            <div className="flex-1 p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center mb-4">
                <div className="h-8 w-48 bg-muted rounded-md"></div>
                <div className="h-10 w-10 bg-muted rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="h-24 bg-primary/5 border rounded-xl"></div>)}
              </div>
              <div className="flex-1 bg-muted/20 border rounded-xl p-4">
                <div className="h-6 w-32 bg-muted rounded mb-6"></div>
                <div className="space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-12 w-full bg-background border rounded-lg"></div>)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function SuccessStories() {
  const stories = [
    { name: "Priya Sharma", role: "Started Home Bakery", img: "https://i.pravatar.cc/150?img=47", text: "EntreSkill Hub helped me turn my weekend baking hobby into a profitable business. My income went from ₹8,000 to ₹45,000/month.", stars: 5 },
    { name: "Rohit Verma", role: "Freelance Web Developer", img: "https://i.pravatar.cc/150?img=11", text: "The step-by-step roadmap gave me the confidence to start my own agency. The mentor connections were invaluable.", stars: 5 },
    { name: "Ananya Iyer", role: "Boutique Owner", img: "https://i.pravatar.cc/150?img=5", text: "I didn't know how to price my products or market them. The learning resources here taught me exactly what I needed to succeed.", stars: 5 },
    { name: "Karan Desai", role: "Tech Repair Shop", img: "https://i.pravatar.cc/150?img=60", text: "From knowing how to fix phones to running a legit registered business. Thank you for the legal and financial guidance!", stars: 5 }
  ];

  return (
    <section className="py-24 bg-muted/30 border-y">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">Real Founders, Real Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {stories.map((s, i) => (
            <div key={i} className="bg-background p-8 rounded-2xl border shadow-sm">
              <div className="flex text-amber-500 mb-4">
                {[1,2,3,4,5].map(star => <Star key={star} className="size-4 fill-current"/>)}
              </div>
              <p className="text-lg italic text-muted-foreground mb-6 leading-relaxed">&ldquo;{s.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold">{s.name}</h4>
                  <p className="text-sm text-muted-foreground">{s.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformMetrics() {
  const metrics = [
    { value: "10,000+", label: "Active Students" },
    { value: "500+", label: "Business Roadmaps" },
    { value: "150+", label: "Verified Mentors" },
    { value: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-4">
              <div className="text-4xl md:text-5xl font-bold font-heading mb-2">{m.value}</div>
              <div className="text-primary-foreground/80 font-medium uppercase tracking-wider text-sm">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SneakPeeks() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Learning Resources Peek */}
          <div>
            <h2 className="text-3xl font-bold mb-4 font-heading">Bite-sized Learning</h2>
            <p className="text-muted-foreground mb-8">Access premium resources curated for your specific business stage. No fluff, just actionable advice.</p>
            <div className="space-y-4">
              {[
                { icon: <Video className="size-5 text-blue-500"/>, title: "How to price your services correctly", time: "10 min video" },
                { icon: <BookOpen className="size-5 text-emerald-500"/>, title: "The ultimate guide to local marketing", time: "5 min read" },
                { icon: <CheckSquare className="size-5 text-amber-500"/>, title: "Business Registration Checklist", time: "Interactive" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors shadow-sm">
                  <div className="p-3 bg-muted rounded-lg">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentors Peek */}
          <div>
            <h2 className="text-3xl font-bold mb-4 font-heading">Expert Mentorship</h2>
            <p className="text-muted-foreground mb-8">Don&apos;t do it alone. Book 1-on-1 sessions with founders who have built successful businesses.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Aarav Mehta", role: "SaaS Founder", img: "https://i.pravatar.cc/150?img=12" },
                { name: "Priya Sharma", role: "D2C Expert", img: "https://i.pravatar.cc/150?img=5" }
              ].map((m, i) => (
                <div key={i} className="p-5 rounded-xl border bg-card text-center hover:shadow-md transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} className="w-16 h-16 rounded-full mx-auto mb-3" />
                  <h4 className="font-bold">{m.name}</h4>
                  <p className="text-xs text-muted-foreground mb-4">{m.role}</p>
                  <div className="w-full py-1.5 bg-primary/10 text-primary rounded-md text-xs font-semibold uppercase tracking-wider">Book Session</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How are business recommendations generated?", a: "Our AI engine analyzes the skills, experience, and interests you provide during onboarding and matches them against proven micro-business models and market trends." },
    { q: "Is this suitable for absolute beginners?", a: "Yes! EntreSkill Hub is specifically designed for people who have a practical skill but zero business experience. The roadmaps start from the very basics." },
    { q: "Is the mentorship free?", a: "Many mentors offer free introductory sessions to give back to the community, while others charge a nominal fee for deep-dive strategy sessions. It's fully transparent upfront." },
    { q: "Can I switch roadmaps if I change my mind?", a: "Absolutely. You can explore multiple roadmaps and pivot at any time. Entrepreneurship is all about finding what works best for you." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30 border-y">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-xl bg-background overflow-hidden transition-all">
              <button 
                className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold focus:outline-none"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                {faq.q}
                {openIdx === i ? <Minus className="size-5 text-muted-foreground shrink-0" /> : <Plus className="size-5 text-muted-foreground shrink-0" />}
              </button>
              <div className={cn("px-6 overflow-hidden transition-all duration-300", openIdx === i ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0")}>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-primary/5 -z-10"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Start Your Entrepreneurial Journey Today</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Turn your existing skills into a profitable business with AI guidance, structured learning, and expert mentorship.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto h-14 px-8 rounded-full shadow-lg text-base")}>
            Create Free Account
          </Link>
          <Link href="#business-ideas" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto h-14 px-8 rounded-full bg-background text-base border-2")}>
            Explore Roadmaps
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background border-t py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <h3 className="font-heading font-bold text-xl mb-4">EntreSkill Hub</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">Empowering skilled individuals to build successful micro-businesses through structured roadmaps and expert mentorship.</p>
            <div className="flex gap-4">
              {/* Dummy icons for socials */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">X</div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">In</div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">Gh</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Roadmaps</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Learning Hub</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Mentors</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Business Ideas</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EntreSkill Hub. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built for founders, by founders.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page Component ---

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20">
      <HeroSection />
      <ProgressTimeline />
      <BusinessCategories />
      <WhySection />
      <FeatureShowcase />
      <SuccessStories />
      <PlatformMetrics />
      <SneakPeeks />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
