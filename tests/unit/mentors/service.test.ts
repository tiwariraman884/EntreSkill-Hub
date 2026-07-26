import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { User, MentorProfile, MentorSession, Skill } from "@/models";
import { getVerifiedMentors, getMentorById, createSession, getMentorSessions, getMenteeSessions, updateSessionStatus, updateSessionDetails, applyToBeMentor, getSessionMessages, addSessionMessage } from "@/domains/mentors/service";

describe("mentors service", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await MentorSession.deleteMany({});
    await MentorProfile.deleteMany({});
    await User.deleteMany({});
    await Skill.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("getVerifiedMentors returns verified mentors", async () => {
    const skill = await Skill.create({ name: "Test Skill", category: "Tech" });
    const user = await User.create({
      name: "Mentor User",
      email: "mentor-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    await MentorProfile.create({
      userId: user._id,
      expertiseAreas: [skill._id],
      yearsExperience: 5,
      bio: "Experienced mentor",
      verificationStatus: "verified",
      availability: [{ day: "Monday", startTime: "09:00", endTime: "17:00" }],
    });

    const mentors = await getVerifiedMentors();
    expect(mentors.length).toBeGreaterThanOrEqual(1);
  });

  it("getMentorById returns mentor profile", async () => {
    const user = await User.create({
      name: "Mentor By Id",
      email: "mentorbyid-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const profile = await MentorProfile.create({
      userId: user._id,
      expertiseAreas: [],
      yearsExperience: 3,
      bio: "Bio",
      verificationStatus: "verified",
      availability: [],
    });

    const found = await getMentorById(profile._id.toString());
    expect(found).toBeTruthy();
    expect(found?.bio).toBe("Bio");
  });

  it("createSession creates a mentor session", async () => {
    const mentor = await User.create({
      name: "Mentor",
      email: "mentor-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const mentee = await User.create({
      name: "Mentee",
      email: "mentee-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const session = await createSession(mentor._id.toString(), mentee._id.toString(), "Hello");
    expect(session.status).toBe("requested");
    expect(session.notes).toBe("Hello");
  });

  it("getMentorSessions returns sessions for mentor", async () => {
    const mentor = await User.create({
      name: "Mentor",
      email: "mentor2-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const mentee = await User.create({
      name: "Mentee",
      email: "mentee2-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    await MentorSession.create({
      mentorId: mentor._id,
      menteeId: mentee._id,
      status: "requested",
      notes: "n/a",
      messages: [],
    });

    const sessions = await getMentorSessions(mentor._id.toString());
    expect(sessions.length).toBeGreaterThanOrEqual(1);
  });

  it("getMenteeSessions returns sessions for mentee", async () => {
    const mentor = await User.create({
      name: "Mentor",
      email: "mentor3-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const mentee = await User.create({
      name: "Mentee",
      email: "mentee3-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    await MentorSession.create({
      mentorId: mentor._id,
      menteeId: mentee._id,
      status: "requested",
      notes: "n/a",
      messages: [],
    });

    const sessions = await getMenteeSessions(mentee._id.toString());
    expect(sessions.length).toBeGreaterThanOrEqual(1);
  });

  it("updateSessionStatus updates session status", async () => {
    const mentor = await User.create({
      name: "Mentor",
      email: "mentor4-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const mentee = await User.create({
      name: "Mentee",
      email: "mentee4-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const session = await MentorSession.create({
      mentorId: mentor._id,
      menteeId: mentee._id,
      status: "requested",
      notes: "n/a",
      messages: [],
    });

    const updated = await updateSessionStatus(session._id.toString(), "confirmed");
    expect(updated.status).toBe("confirmed");
  });

  it("updateSessionDetails updates meeting link", async () => {
    const mentor = await User.create({
      name: "Mentor",
      email: "mentor5-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const mentee = await User.create({
      name: "Mentee",
      email: "mentee5-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const session = await MentorSession.create({
      mentorId: mentor._id,
      menteeId: mentee._id,
      status: "requested",
      notes: "n/a",
      messages: [],
    });

    const updated = await updateSessionDetails(session._id.toString(), {
      meetingLink: "https://meet.example.com",
    });
    expect(updated.meetingLink).toBe("https://meet.example.com");
  });

  it("applyToBeMentor creates or updates mentor profile", async () => {
    const user = await User.create({
      name: "Apply Mentor",
      email: "apply-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const profile = await applyToBeMentor(user._id.toString(), {
      bio: "New mentor bio",
      expertiseAreas: [],
      yearsExperience: 2,
    });

    expect(profile.verificationStatus).toBe("pending");
    expect(profile.bio).toBe("New mentor bio");
  });

  it("getSessionMessages returns messages", async () => {
    const mentor = await User.create({
      name: "Mentor",
      email: "mentor6-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const mentee = await User.create({
      name: "Mentee",
      email: "mentee6-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const session = await MentorSession.create({
      mentorId: mentor._id,
      menteeId: mentee._id,
      status: "requested",
      notes: "n/a",
      messages: [{ senderId: mentor._id, body: "Hello", createdAt: new Date() }],
    });

    const messages = await getSessionMessages(session._id.toString());
    expect(messages.length).toBeGreaterThanOrEqual(1);
  });

  it("addSessionMessage adds a message", async () => {
    const mentor = await User.create({
      name: "Mentor",
      email: "mentor7-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const mentee = await User.create({
      name: "Mentee",
      email: "mentee7-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const session = await MentorSession.create({
      mentorId: mentor._id,
      menteeId: mentee._id,
      status: "requested",
      notes: "n/a",
      messages: [],
    });

    const message = await addSessionMessage(session._id.toString(), mentee._id.toString(), "Hi there");
    expect(message.body).toBe("Hi there");
  });
});
