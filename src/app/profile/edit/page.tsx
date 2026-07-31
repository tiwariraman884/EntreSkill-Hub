"use client";

import { useState, useEffect, useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { DUMMY_USER } from "@/data/mock-notifications";
import type { DummyUser } from "@/lib/notification-types";
import { ArrowLeft, Save, RotateCcw, Loader2, CheckCircle2, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const INITIAL_FORM: Omit<DummyUser, "id" | "avatarUrl" | "level" | "xp" | "xpToNextLevel" | "streakDays" | "certificates" | "courses" | "roadmaps" | "projects" | "mentorSessions" | "bookmarks" | "achievements" | "completionPercentage"> = {
  firstName: DUMMY_USER.firstName,
  lastName: DUMMY_USER.lastName,
  username: DUMMY_USER.username,
  email: DUMMY_USER.email,
  phone: DUMMY_USER.phone || "",
  bio: DUMMY_USER.bio || "",
  college: DUMMY_USER.college || "",
  degree: DUMMY_USER.degree || "",
  department: DUMMY_USER.department || "",
  skills: DUMMY_USER.skills,
  github: DUMMY_USER.github || "",
  linkedin: DUMMY_USER.linkedin || "",
  portfolio: DUMMY_USER.portfolio || "",
  website: DUMMY_USER.website || "",
  location: DUMMY_USER.location || "",
  dateOfBirth: DUMMY_USER.dateOfBirth || "",
  occupation: DUMMY_USER.occupation || "",
  startupInterests: DUMMY_USER.startupInterests || [],
  preferredIndustries: DUMMY_USER.preferredIndustries || [],
  role: DUMMY_USER.role,
};

export default function EditProfilePage() {
  const { update } = useSession();
  const [form, setForm] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(DUMMY_USER.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("entreskill_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm(prev => ({ ...prev, ...parsed }));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleChange = (field: keyof typeof form, value: string | string[]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(",").map(s => s.trim()).filter(Boolean);
    handleChange("skills", skills);
  };

  const handleAvatarUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      update?.({ image: result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(undefined);
    update?.({ image: null });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem("entreskill_profile", JSON.stringify(form));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setAvatarPreview(DUMMY_USER.avatarUrl);
    toast.success("Profile reset to defaults");
  };

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/profile" className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-xl" })}>
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold font-heading">Edit Profile</h1>
              <p className="text-sm text-thread">Update your personal information</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleReset} className="border-indigo/20 hover:bg-indigo/5">
              <RotateCcw className="size-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-indigo to-indigo-light">
              {isLoading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border-2 border-emerald-500/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="size-5 shrink-0" />
            <span className="font-medium">Profile updated successfully!</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Avatar Section */}
          <Card className="bg-white border-border/40 shadow-premium">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <ProfileAvatar
                  src={avatarPreview}
                  name={`${form.firstName} ${form.lastName}`}
                  size="lg"
                  editable
                  onUpload={handleAvatarUpload}
                  onRemove={handleRemoveAvatar}
                />
                <div>
                  <h3 className="font-semibold mb-1">{form.firstName} {form.lastName}</h3>
                  <p className="text-sm text-thread mb-3">Upload a professional photo</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => fileInputRef.current?.click()} className="bg-gradient-to-r from-indigo to-indigo-light">
                      <Upload className="size-4 mr-2" />
                      Upload Photo
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleAvatarUpload(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="bg-white border-border/40 shadow-premium">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={form.username} onChange={(e) => handleChange("username", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" value={form.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={form.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className="w-full p-3 text-sm border-2 border-border/40 rounded-xl bg-transparent outline-none focus:border-indigo transition-all min-h-[80px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="bg-white border-border/40 shadow-premium">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="college">College</Label>
                  <Input id="college" value={form.college} onChange={(e) => handleChange("college", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" value={form.degree} onChange={(e) => handleChange("degree", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={form.department} onChange={(e) => handleChange("department", e.target.value)} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" value={form.occupation} onChange={(e) => handleChange("occupation", e.target.value)} className="h-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional */}
          <Card className="bg-white border-border/40 shadow-premium">
            <CardHeader>
              <CardTitle>Professional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" value={form.github} onChange={(e) => handleChange("github", e.target.value)} className="h-10" placeholder="https://github.com/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" value={form.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} className="h-10" placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio</Label>
                  <Input id="portfolio" value={form.portfolio} onChange={(e) => handleChange("portfolio", e.target.value)} className="h-10" placeholder="https://yourportfolio.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value={form.website} onChange={(e) => handleChange("website", e.target.value)} className="h-10" placeholder="https://yourwebsite.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Interests */}
          <Card className="bg-white border-border/40 shadow-premium">
            <CardHeader>
              <CardTitle>Skills & Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <textarea
                    id="skills"
                    value={form.skills.join(", ")}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="w-full p-3 text-sm border-2 border-border/40 rounded-xl bg-transparent outline-none focus:border-indigo transition-all min-h-[80px]"
                    placeholder="JavaScript, React, Node.js..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startupInterests">Startup Interests (comma separated)</Label>
                  <textarea
                    id="startupInterests"
                    value={form.startupInterests?.join(", ") || ""}
                    onChange={(e) => handleChange("startupInterests", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                    className="w-full p-3 text-sm border-2 border-border/40 rounded-xl bg-transparent outline-none focus:border-indigo transition-all min-h-[80px]"
                    placeholder="SaaS, EdTech, Developer Tools..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredIndustries">Preferred Industries (comma separated)</Label>
                  <textarea
                    id="preferredIndustries"
                    value={form.preferredIndustries?.join(", ") || ""}
                    onChange={(e) => handleChange("preferredIndustries", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                    className="w-full p-3 text-sm border-2 border-border/40 rounded-xl bg-transparent outline-none focus:border-indigo transition-all min-h-[80px]"
                    placeholder="Technology, Education, Healthcare..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
