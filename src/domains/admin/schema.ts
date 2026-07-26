import { z } from "zod";

export const adminUserActionSchema = z.object({
  action: z.enum(["suspend", "delete", "verify", "reject"]),
  reason: z.string().optional(),
});

export const contentApprovalSchema = z.object({
  status: z.enum(["approved", "rejected", "pending_review"]),
  reason: z.string().optional(),
});

export const reportTriageSchema = z.object({
  severity: z.enum(["low", "medium", "high", "critical"]),
  category: z.enum(["content", "mentor_conduct", "user_behavior", "bug", "other"]),
  status: z.enum(["open", "investigating", "resolved", "dismissed"]),
  resolutionNote: z.string().optional(),
});

export const dateRangeSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export type AdminUserActionInput = z.infer<typeof adminUserActionSchema>;
export type ContentApprovalInput = z.infer<typeof contentApprovalSchema>;
export type ReportTriageInput = z.infer<typeof reportTriageSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
