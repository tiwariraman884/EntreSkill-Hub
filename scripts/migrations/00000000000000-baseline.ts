import mongoose from "mongoose";

export async function up(): Promise<void> {
  if (!mongoose.connection.db) {
    throw new Error("Database connection is not established");
  }
  const collections = await mongoose.connection.db.listCollections().toArray();
  const names = collections.map((c) => c.name);

  const expectedCollections = [
    "users",
    "skills",
    "businessideas",
    "roadmaps",
    "roadmapsteps",
    "learningresources",
    "mentorprofiles",
    "userprogress",
    "mentorsessions",
    "feedback",
    "notifications",
    "auditlogs",
    "assessmentresults",
  ];

  const missing = expectedCollections.filter((name) => !names.includes(name));
  if (missing.length > 0) {
    console.warn(`Baseline check: missing collections: ${missing.join(", ")}`);
  } else {
    console.log("Baseline check: all expected collections present");
  }
}

export async function down(): Promise<void> {
  console.log("Baseline rollback: no data changes needed");
}
