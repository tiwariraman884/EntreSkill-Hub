"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  Globe,
  User,
  Palette,
  Bell,
  Lock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Mail,
  ArrowLeftRight,
  Contrast,
  MousePointer2,
  Info,
  Download,
  Key,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useAppearance } from "@/context/AppearanceContext";
import type { FontSize, BorderRadius, CardDensity } from "@/types/appearance";
import { useProfile } from "@/hooks/use-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, emailChangeSchema, deleteAccountSchema } from "@/lib/validations/settings";
import type { ChangePasswordInput, EmailChangeInput, DeleteAccountInput, NotificationInput, PrivacyInput } from "@/lib/validations/settings";
import { changePassword, changeEmail, deleteAccount } from "@/actions/profile";

// Subcomponents
import { Toggle } from "@/components/settings/Toggle";
import { SegmentControl } from "@/components/settings/SegmentControl";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { ColorPicker } from "@/components/settings/ColorPicker";
import { AvatarUploader } from "@/components/settings/AvatarUploader";
import { InputField } from "@/components/settings/InputField";
import { SectionTitle } from "@/components/settings/SectionTitle";
import { Sidebar, type SettingsTab } from "@/components/settings/Sidebar";
import { SettingsLayout } from "@/components/settings/SettingsLayout";

const SIDEBAR_SECTIONS = [
  {
    title: "Profile",
    items: [
      { value: "general" as SettingsTab, label: "General", icon: Globe },
      { value: "account" as SettingsTab, label: "Account", icon: User },
      { value: "appearance" as SettingsTab, label: "Appearance", icon: Palette },
      { value: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
    ],
  },
  {
    title: "Security",
    items: [
      { value: "privacy" as SettingsTab, label: "Privacy", icon: Lock },
      { value: "security" as SettingsTab, label: "Security", icon: Shield },
    ],
  },
  {
    title: "Account",
    items: [
      { value: "danger" as SettingsTab, label: "Danger Zone", icon: AlertTriangle },
    ],
  },
];

const ALL_TABS = SIDEBAR_SECTIONS.flatMap(s => s.items);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const {
    profile,
    account,
    notifications,
    privacy,
    isSaving,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    profileForm,
    accountForm,
    notificationForm,
    privacyForm,
    saveProfile,
    saveAccount,
    saveNotifications,
    savePrivacy,
    uploadAvatar,
    removeAvatar,
  } = useProfile();

  const { settings, setTheme, setAccentColor, setFontSize, setCompactMode, setHighContrast, setReducedMotion, setBorderRadius, setCardDensity, resetToDefaults } = useAppearance();

  const passwordForm = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    mode: "onChange",
  });

  const emailForm = useForm<EmailChangeInput>({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: { email: "", currentPassword: "" },
    mode: "onChange",
  });

  const deleteForm = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { confirmation: "", password: "" },
    mode: "onChange",
  });

  const fontSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const borderRadiusOptions = [
    { value: "rounded", label: "Rounded" },
    { value: "modern", label: "Modern" },
    { value: "sharp", label: "Sharp" },
  ];

  const densityOptions = [
    { value: "comfortable", label: "Comfortable" },
    { value: "compact", label: "Compact" },
  ];

  const activeTabLabel = ALL_TABS.find(t => t.value === activeTab)?.label || "Settings";

  return (
    <SettingsLayout
      activeTabLabel={activeTabLabel}
      sidebar={
        <Sidebar
          sections={SIDEBAR_SECTIONS}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />
      }
    >
      <header className="relative mb-12 text-left">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary-light shadow-lg shadow-primary/25">
            <SettingsIcon className="size-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[48px] font-bold font-heading text-foreground tracking-tight leading-none">
                Settings
              </h1>
              {hasUnsavedChanges && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 shadow-sm">
                  Unsaved changes
                </Badge>
              )}
            </div>
            <p className="text-[18px] text-muted-foreground mt-2">
              Manage your account, appearance, notifications and security.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        {activeTab === "general" && (
          <SettingsCard delayIndex={0} reducedMotion={settings.reducedMotion}>
            <SectionTitle
              title="Profile Information"
              description="Update your profile photo and details."
              icon={Globe}
            />
            <div className="space-y-8">
              <AvatarUploader
                currentAvatar={profile.avatar || null}
                name={profile.name}
                onUpload={async (file) => {
                  const result = await uploadAvatar(file);
                  if (result.success && result.avatar) {
                    profileForm.setValue("avatar", result.avatar);
                  }
                  return result;
                }}
                onRemove={async () => {
                  const result = await removeAvatar();
                  if (result.success) {
                    profileForm.setValue("avatar", "");
                  }
                  return result;
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name *"
                  id="name"
                  {...profileForm.register("name")}
                  error={profileForm.formState.errors.name?.message}
                  isSuccess={profileForm.formState.dirtyFields.name && !profileForm.formState.errors.name}
                  onChange={(e) => {
                    profileForm.setValue("name", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
                <InputField
                  label="Headline"
                  id="headline"
                  {...profileForm.register("headline")}
                  error={profileForm.formState.errors.headline?.message}
                  isSuccess={profileForm.formState.dirtyFields.headline && !profileForm.formState.errors.headline}
                  onChange={(e) => {
                    profileForm.setValue("headline", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>

              {/* Bio block with character counter */}
              <div className="space-y-2 text-left relative">
                <label htmlFor="bio" className="text-sm font-semibold text-muted-foreground px-1">Bio</label>
                <textarea
                  id="bio"
                  {...profileForm.register("bio")}
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                  onChange={(e) => {
                    profileForm.setValue("bio", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full min-h-30 p-4 rounded-2xl border-2 border-border/80 bg-white dark:bg-[#0f172a] text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-all duration-300 resize-y"
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                  {profileForm.formState.errors.bio && (
                    <span className="text-destructive font-semibold">{profileForm.formState.errors.bio.message}</span>
                  )}
                  <span className="ml-auto tabular-nums">
                    Remaining: {500 - (profileForm.watch("bio")?.length || 0)} / 500
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Location"
                  id="location"
                  {...profileForm.register("location")}
                  isSuccess={profileForm.formState.dirtyFields.location}
                  onChange={(e) => {
                    profileForm.setValue("location", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
                <InputField
                  label="Occupation"
                  id="occupation"
                  {...profileForm.register("occupation")}
                  isSuccess={profileForm.formState.dirtyFields.occupation}
                  onChange={(e) => {
                    profileForm.setValue("occupation", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
                <InputField
                  label="College / University"
                  id="college"
                  {...profileForm.register("college")}
                  isSuccess={profileForm.formState.dirtyFields.college}
                  onChange={(e) => {
                    profileForm.setValue("college", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
                <InputField
                  label="Degree"
                  id="degree"
                  {...profileForm.register("degree")}
                  isSuccess={profileForm.formState.dirtyFields.degree}
                  onChange={(e) => {
                    profileForm.setValue("degree", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>

              <div className="border-t border-border/70 my-6" />

              <SectionTitle
                title="Social Links"
                description="Connect your social profiles to show on your public page."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Website URL"
                  id="website"
                  {...profileForm.register("website")}
                  error={profileForm.formState.errors.website?.message}
                  isSuccess={profileForm.formState.dirtyFields.website && !profileForm.formState.errors.website}
                  onChange={(e) => {
                    profileForm.setValue("website", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
                <InputField
                  label="LinkedIn URL"
                  id="linkedin"
                  {...profileForm.register("linkedin")}
                  error={profileForm.formState.errors.linkedin?.message}
                  isSuccess={profileForm.formState.dirtyFields.linkedin && !profileForm.formState.errors.linkedin}
                  onChange={(e) => {
                    profileForm.setValue("linkedin", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
                <InputField
                  label="GitHub URL"
                  id="github"
                  {...profileForm.register("github")}
                  error={profileForm.formState.errors.github?.message}
                  isSuccess={profileForm.formState.dirtyFields.github && !profileForm.formState.errors.github}
                  onChange={(e) => {
                    profileForm.setValue("github", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
                <InputField
                  label="Portfolio URL"
                  id="portfolio"
                  {...profileForm.register("portfolio")}
                  error={profileForm.formState.errors.portfolio?.message}
                  isSuccess={profileForm.formState.dirtyFields.portfolio && !profileForm.formState.errors.portfolio}
                  onChange={(e) => {
                    profileForm.setValue("portfolio", e.target.value, { shouldDirty: true });
                    setHasUnsavedChanges(true);
                  }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    profileForm.reset();
                    setHasUnsavedChanges(false);
                  }}
                  className="rounded-xl"
                >
                  Reset
                </Button>
                <Button
                  onClick={profileForm.handleSubmit(async (data) => {
                    await saveProfile(data);
                    setHasUnsavedChanges(false);
                  })}
                  disabled={isSaving || !hasUnsavedChanges}
                  className="rounded-xl bg-linear-to-r from-secondary to-accent-dark text-white hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin mr-2" /> : <CheckCircle2 className="size-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </SettingsCard>
        )}

        {activeTab === "account" && (
          <SettingsCard delayIndex={0} reducedMotion={settings.reducedMotion}>
            <SectionTitle
              title="Account Information"
              description="Manage language, timezone, country and regional settings."
              icon={User}
            />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <label htmlFor="language" className="text-sm font-semibold text-muted-foreground">Language</label>
                  <select
                    id="language"
                    value={account.language || "en"}
                    onChange={(e) => {
                      accountForm.setValue("language", e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full h-14 px-4 rounded-2xl border-2 border-border/80 bg-white dark:bg-[#0f172a] text-foreground focus:border-primary outline-none transition-all duration-300"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="timezone" className="text-sm font-semibold text-muted-foreground">Timezone</label>
                  <select
                    id="timezone"
                    value={account.timezone || "Asia/Kolkata"}
                    onChange={(e) => {
                      accountForm.setValue("timezone", e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full h-14 px-4 rounded-2xl border-2 border-border/80 bg-white dark:bg-[#0f172a] text-foreground focus:border-primary outline-none transition-all duration-300"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  onClick={accountForm.handleSubmit(async (data) => {
                    await saveAccount(data);
                  })}
                  disabled={isSaving}
                  className="rounded-xl bg-linear-to-r from-secondary to-accent-dark text-white hover:shadow-lg transition-all"
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin mr-2" /> : <CheckCircle2 className="size-4 mr-2" />}
                  Save Changes
                </Button>
              </div>

              <div className="border-t border-border/70 my-8" />

              <SectionTitle
                title="Email Address"
                description="Change your primary login email address."
                icon={Mail}
              />
              <Alert variant="default" className="rounded-2xl bg-primary/5 border border-primary/20">
                <Info className="size-4 shrink-0 text-primary animate-pulse" aria-hidden="true" />
                <AlertDescription className="text-sm text-foreground">
                  Changing your email will require verification. You will receive a confirmation link at your new address.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <InputField
                  label="New Email Address"
                  id="email"
                  type="email"
                  {...emailForm.register("email")}
                  error={emailForm.formState.errors.email?.message}
                />
                <InputField
                  label="Current Password"
                  id="currentPassword_Account"
                  type="password"
                  {...emailForm.register("currentPassword")}
                  error={emailForm.formState.errors.currentPassword?.message}
                />
              </div>

              <div className="flex justify-start">
                <Button
                  onClick={emailForm.handleSubmit(async (data) => {
                    const result = await changeEmail(data);
                    if (result.success) {
                      toast.success(result.message || "Email updated successfully");
                      emailForm.reset();
                    } else {
                      toast.error(result.error || "Failed to update email");
                    }
                  })}
                  disabled={isSaving}
                  className="rounded-xl"
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
                  Update Email
                </Button>
              </div>
            </div>
          </SettingsCard>
        )}

        {activeTab === "appearance" && (
          <div className="space-y-8">
            <SettingsCard delayIndex={0} reducedMotion={settings.reducedMotion}>
              <SectionTitle
                title="Theme"
                description="Choose how the interface looks across the platform."
                icon={Palette}
              />
              <ThemeSelector currentTheme={settings.theme} onChange={(t) => setTheme(t)} />
            </SettingsCard>

            <SettingsCard delayIndex={1} reducedMotion={settings.reducedMotion}>
              <SectionTitle
                title="Accent Color"
                description="Customize primary buttons, icons, highlights, and navigation focus."
              />
              <ColorPicker value={settings.accentColor} onChange={(c) => setAccentColor(c)} />
            </SettingsCard>

            <SettingsCard delayIndex={2} reducedMotion={settings.reducedMotion}>
              <SectionTitle
                title="Typography & Spacing"
                description="Adjust sizes, border tokens, and layout density."
              />
              <div className="space-y-8 text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-foreground text-sm">Font Size</label>
                    <span className="text-xs text-muted-foreground font-mono">
                      {settings.fontSize === "small" && "14px"}
                      {settings.fontSize === "medium" && "16px"}
                      {settings.fontSize === "large" && "18px"}
                      {settings.fontSize === "xl" && "20px"}
                    </span>
                  </div>
                  <SegmentControl
                    options={fontSizes}
                    value={settings.fontSize === "xl" ? "medium" : settings.fontSize}
                    onChange={(val) => setFontSize(val as FontSize)}
                  />

                  {/* Live preview block */}
                  <div className="mt-3 p-4 rounded-2xl bg-muted/40 border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-1">Live Font Size Preview</span>
                    <p style={{ fontSize: `var(--font-size-base, 16px)` }} className="text-foreground font-medium transition-all duration-300">
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                </div>

                <div className="border-t border-border/70 my-6" />

                <div className="space-y-3">
                  <label className="font-semibold text-foreground text-sm">Border Radius</label>
                  <SegmentControl
                    options={borderRadiusOptions}
                    value={settings.borderRadius}
                    onChange={(val) => setBorderRadius(val as BorderRadius)}
                  />
                </div>

                <div className="border-t border-border/70 my-6" />

                <div className="space-y-3">
                  <label className="font-semibold text-foreground text-sm">Card Density</label>
                  <SegmentControl
                    options={densityOptions}
                    value={settings.cardDensity}
                    onChange={(val) => setCardDensity(val as CardDensity)}
                  />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard delayIndex={3} reducedMotion={settings.reducedMotion}>
              <SectionTitle
                title="Accessibility & Motion"
                description="Configure the platform accessibility parameters."
                icon={ArrowLeftRight}
              />
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <ArrowLeftRight className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Compact Mode</p>
                      <p className="text-xs text-muted-foreground">Reduce layout heights and margins</p>
                    </div>
                  </div>
                  <Toggle checked={settings.compactMode} onChange={(val) => setCompactMode(val)} />
                </div>
                <div className="flex items-center justify-between py-3 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Contrast className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">High Contrast</p>
                      <p className="text-xs text-muted-foreground">Increase element readability borders</p>
                    </div>
                  </div>
                  <Toggle checked={settings.highContrast} onChange={(val) => setHighContrast(val)} />
                </div>
                <div className="flex items-center justify-between py-3 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MousePointer2 className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Reduced Motion</p>
                      <p className="text-xs text-muted-foreground">Mute and shorten structural transitions</p>
                    </div>
                  </div>
                  <Toggle checked={settings.reducedMotion} onChange={(val) => setReducedMotion(val)} />
                </div>
              </div>
            </SettingsCard>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={resetToDefaults} className="rounded-xl border-2 border-primary/20">
                Reset to Defaults
              </Button>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <SettingsCard delayIndex={0} reducedMotion={settings.reducedMotion}>
            <SectionTitle
              title="Notification Preferences"
              description="Manage how and when you receive notifications."
              icon={Bell}
            />
            <div className="space-y-6 text-left">
              {(() => {
                const notificationItems: { key: keyof NotificationInput; label: string; desc: string }[] = [
                  { key: "mentorReminders", label: "Mentor Reminders", desc: "Session reminders and messages" },
                  { key: "learningReminders", label: "Learning Reminders", desc: "Course updates and deadlines" },
                  { key: "roadmapReminders", label: "Roadmap Reminders", desc: "Milestone updates and progress" },
                  { key: "achievementAlerts", label: "Achievement Alerts", desc: "Badges, streaks, and milestones" },
                  { key: "weeklySummary", label: "Weekly Summary", desc: "Your weekly activity report" },
                  { key: "securityAlerts", label: "Security Alerts", desc: "Login attempts and security updates" },
                  { key: "productUpdates", label: "Product Updates", desc: "New features and improvements" },
                  { key: "marketingEmails", label: "Marketing Emails", desc: "Promotions and offers" },
                ];
                return notificationItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Toggle
                      checked={notifications[item.key]}
                      onChange={(checked) => {
                        notificationForm.setValue(item.key, checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>
                ));
              })()}

              <div className="border-t border-border/70 my-6" />

              <div className="flex justify-end pt-4">
                <Button
                  onClick={notificationForm.handleSubmit(async (data) => {
                    await saveNotifications(data);
                  })}
                  disabled={isSaving}
                  className="rounded-xl bg-linear-to-r from-secondary to-accent-dark text-white hover:shadow-lg transition-all"
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin mr-2" /> : <CheckCircle2 className="size-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </SettingsCard>
        )}

        {activeTab === "privacy" && (
          <SettingsCard delayIndex={0} reducedMotion={settings.reducedMotion}>
            <SectionTitle
              title="Privacy Settings"
              description="Control what information is visible on your public profile."
              icon={Lock}
            />
            <div className="space-y-6 text-left">
              {(() => {
                const privacyItems: { key: keyof PrivacyInput; label: string; desc: string }[] = [
                  { key: "publicProfile", label: "Public Profile", desc: "Make your profile visible to everyone" },
                  { key: "showEmail", label: "Show Email", desc: "Display your email on your profile" },
                  { key: "showPhone", label: "Show Phone", desc: "Display your phone number on your profile" },
                  { key: "showSkills", label: "Show Skills", desc: "Display your skills on your profile" },
                  { key: "showCertificates", label: "Show Certificates", desc: "Display your certificates on your profile" },
                  { key: "showRoadmaps", label: "Show Roadmaps", desc: "Display your roadmaps on your profile" },
                  { key: "showActivity", label: "Show Activity", desc: "Display your recent activity" },
                  { key: "allowIndexing", label: "Allow Indexing", desc: "Allow search engines to index your profile" },
                  { key: "allowMentorContact", label: "Allow Mentor Contact", desc: "Allow mentors to contact you" },
                  { key: "showIdeas", label: "Show Ideas", desc: "Display your startup ideas publicly" },
                ];
                return privacyItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Toggle
                      checked={privacy[item.key]}
                      onChange={(checked) => {
                        privacyForm.setValue(item.key, checked);
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </div>
                ));
              })()}

              <div className="border-t border-border/70 my-6" />

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={async () => {
                    await new Promise(r => setTimeout(r, 600));
                    toast.success("Data export started. You will receive an email shortly.");
                  }}
                  className="rounded-xl border-2 border-primary/20"
                >
                  <Download className="size-4 mr-2" />
                  Export My Data
                </Button>
                <Button
                  onClick={privacyForm.handleSubmit(async (data) => {
                    await savePrivacy(data);
                  })}
                  disabled={isSaving}
                  className="rounded-xl bg-linear-to-r from-secondary to-accent-dark text-white hover:shadow-lg transition-all"
                >
                  {isSaving ? <Loader2 className="size-4 animate-spin mr-2" /> : <CheckCircle2 className="size-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </SettingsCard>
        )}

        {activeTab === "security" && (
          <div className="space-y-8">
            <SettingsCard delayIndex={0} reducedMotion={settings.reducedMotion}>
              <SectionTitle
                title="Change Password"
                description="Update your password to keep your account secure."
                icon={Key}
              />
              <div className="space-y-6">
                <div className="grid gap-6">
                  <InputField
                    label="Current Password"
                    id="currentPassword_Security"
                    type="password"
                    {...passwordForm.register("currentPassword")}
                    error={passwordForm.formState.errors.currentPassword?.message}
                  />
                  <InputField
                    label="New Password"
                    id="newPassword"
                    type="password"
                    {...passwordForm.register("newPassword")}
                    error={passwordForm.formState.errors.newPassword?.message}
                  />
                  <InputField
                    label="Confirm New Password"
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                    error={passwordForm.formState.errors.confirmPassword?.message}
                  />
                </div>

                <div className="flex justify-start">
                  <Button
                    onClick={passwordForm.handleSubmit(async (data) => {
                      const result = await changePassword(data);
                      if (result.success) {
                        toast.success(result.message || "Password updated successfully");
                        passwordForm.reset();
                      } else {
                        toast.error(result.error || "Failed to update password");
                      }
                    })}
                    disabled={isSaving}
                    className="rounded-xl bg-linear-to-r from-secondary to-accent-dark text-white hover:shadow-lg transition-all"
                  >
                    {isSaving ? <Loader2 className="size-4 animate-spin mr-2" /> : <Shield className="size-4 mr-2" />}
                    Update Password
                  </Button>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard delayIndex={1} reducedMotion={settings.reducedMotion}>
              <SectionTitle
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account."
                icon={Shield}
              />
              <div className="space-y-4 text-left">
                <Alert variant="default" className="rounded-2xl">
                  <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  <AlertDescription>
                    Two-factor authentication adds an extra layer of security by requiring a code from your authenticator app in addition to your password.
                  </AlertDescription>
                </Alert>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold text-sm text-foreground">Enable 2FA</p>
                    <p className="text-xs text-muted-foreground">Protect your account with an authenticator app</p>
                  </div>
                  <Toggle checked={false} onChange={() => toast.success("2FA setting changed")} />
                </div>
              </div>
            </SettingsCard>
          </div>
        )}

        {activeTab === "danger" && (
          <SettingsCard delayIndex={0} reducedMotion={settings.reducedMotion} className="border-destructive/30 border-2 bg-red-50/5">
            <SectionTitle
              title="Danger Zone"
              description="Irreversible actions that permanently affect your account."
              icon={AlertTriangle}
              className="text-destructive"
            />
            <div className="space-y-6 text-left">
              <Alert variant="destructive" className="rounded-2xl bg-destructive/5 border border-destructive/20 text-destructive">
                <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
                <AlertTitle className="font-bold">Warning: Permanent Account Deletion</AlertTitle>
                <AlertDescription className="text-sm">
                  Once you delete your account, there is no going back. All your data, including courses, progress, and personal information will be permanently removed.
                </AlertDescription>
              </Alert>

              <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/10 space-y-6">
                <div>
                  <p className="font-bold text-foreground">Delete Account</p>
                  <p className="text-xs text-muted-foreground">
                    Type &ldquo;DELETE MY ACCOUNT&rdquo; and enter your password below to confirm.
                  </p>
                </div>
                <div className="space-y-4">
                  <InputField
                    label='Type "DELETE MY ACCOUNT" to confirm'
                    id="confirmation"
                    {...deleteForm.register("confirmation")}
                    error={deleteForm.formState.errors.confirmation?.message}
                  />
                  <InputField
                    label="Password"
                    id="password_Danger"
                    type="password"
                    {...deleteForm.register("password")}
                    error={deleteForm.formState.errors.password?.message}
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={deleteForm.handleSubmit(async (data) => {
                    const result = await deleteAccount(data);
                    if (result.success) {
                      toast.success(result.message || "Account deletion scheduled");
                      deleteForm.reset();
                    } else {
                      toast.error(result.error || "Failed to delete account");
                    }
                  })}
                  className="rounded-xl flex items-center justify-center bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete Account Permanently
                </Button>
              </div>
            </div>
          </SettingsCard>
        )}
      </div>
    </SettingsLayout>
  );
}
