# AI Editor Guardrails — Scoped Change Discipline
## EntreSkill Hub

| | |
|---|---|
| **Version** | 1.0 |
| **Purpose** | Prevent AI coding editors (Cursor, Claude Code, Copilot) from making unintended changes outside the scope of a given prompt |
| **Companion Docs** | Architecture.md (domain isolation), Testing.md (CI safety net) |

---

## Scope Discipline (Read Before Every Change)

- Only modify files explicitly named or clearly required by the current request's SCOPE.
- Never refactor, rename, reformat, or "improve" code outside that scope, even if it looks improvable. If you notice something outside scope, mention it in the response — do not fix it.
- Never modify files in `/lib` or `/components` as a side effect of a domain-specific feature change unless the prompt explicitly says the shared file is in scope.
- Never cross domain boundaries — a change inside `/domains/X` should not touch `/domains/Y`'s `model.ts`, `service.ts`, `actions.ts`, or `queries.ts`.
- If a request is ambiguous about scope, ask for clarification on which files/domains are affected before making changes, rather than guessing broadly.
- When done, summarize exactly which files were changed and why each one was necessary — do not summarize "what was improved" if it wasn't asked for.

---

## 1. Why Scope Drift Happens

AI editors drift from scope for predictable reasons:

1. **Large context windows encourage "while I'm in here" behavior.** Reading several related files biases the model toward "improving" adjacent code it wasn't asked to touch.
2. **Ambiguous prompts get filled in with assumptions.** "Fix the roadmap progress bug" has many interpretations; without tight scope, the editor picks one and may refactor around it.
3. **Weak project boundaries invite cross-cutting edits.** Without structural enforcement, a "fix" to one domain can silently bleed into shared utilities or auth helpers.
4. **Long conversations accumulate implicit context.** The editor may start "correcting" earlier code toward patterns it saw more recently, even when nobody asked.
5. **No enforced diff review step.** Drift compounds silently when changes are accepted wholesale without scoped diff review.

---

## 2. Structural Defenses

### 2.1 Domain Isolation is the Primary Defense

Architecture defines domain boundaries (`/domains/auth`, `/domains/roadmaps`, etc.) with a hard rule: **domains do not import each other's `model.ts` directly.**

**Enforcement:**
- ESLint rule (`eslint-plugin-boundaries`) that fails the build if a file in one domain imports internals from another domain.
- Any PR violating domain boundaries signals the prompt was under-scoped.

### 2.2 Keep Shared Code Small and Stable

Files in `/lib` and `/components` are the highest-risk surface for cross-feature drift.

- Shared code changes are **never** an incidental side-effect of a feature prompt. Shared changes require a separate, explicit prompt.
- Prefer domain-local duplication over premature shared abstractions.

### 2.3 One Feature, One Branch, One PR

Each small-prompt change should be its own branch/commit, reviewed in isolation. A "fix the roadmap step counter" PR that also touches `auth.ts` is an immediate red flag.

---

## 3. Prompt Discipline

### 3.1 The Scoped-Prompt Template

Use this structure for every change, especially mid-project:

```
SCOPE: [exact feature/file(s) this touches — name the domain folder]
CHANGE: [exactly what should change, described precisely]
DO NOT TOUCH: [adjacent things that might look related but aren't in scope]
ACCEPTANCE: [how you'll know it's correct]
```

**Example:**
```
SCOPE: /domains/roadmaps only — specifically the completionPercent calculation in service.ts
CHANGE: Fix the bug where completionPercent shows >100% when a step is completed twice.
DO NOT TOUCH: The UserProgress schema, the API route handler, or any other domain's files.
ACCEPTANCE: Calling the complete-step endpoint twice on the same step results in completionPercent
capping correctly and completedStepIds has no duplicates.
```

### 3.2 Explicitly Forbid Refactoring Unless Asked

> "Never refactor, rename, reformat, or 'clean up' code outside the exact scope of the current prompt, even if you notice something that looks improvable. Report it instead."

### 3.3 Shared/Cross-Cutting Changes Get Their Own Explicit Prompt

If a feature prompt genuinely requires a shared file to change, state it explicitly:

```
SCOPE: This prompt intentionally touches /lib/validators.ts (shared) because both
/domains/roadmaps and /domains/resources need the new validator. Do not extend
the change to any other shared file beyond this one.
```

### 3.4 Reference Exact File Paths, Not Just Feature Names

"Fix the mentor session bug" is weaker than "Fix the bug in `/domains/mentors/service.ts`, in the `confirmSession` function."

---

## 4. Process Gates

### 4.1 Always Review the Full Diff Before Accepting

Read `git diff` end to end. Look for:
- Files touched that weren't named in your `SCOPE:` line.
- Import statements added/removed in files you didn't ask about.
- Formatting-only changes outside scope (invisible drift vector).
- Renamed variables/functions in code you didn't ask to touch.

### 4.2 Run Domain-Boundary Lint on Every Diff

Turns "did the editor cross a domain boundary" from a manual question into an automated pass/fail check.

### 4.3 Run the Full Test Suite, Not Just the Touched Domain's Tests

A genuinely scoped change shouldn't break tests elsewhere. Any unexpected failure outside the target domain is a signal to re-scope the prompt.

### 4.4 Commit Messages Should Restate the Scope

```
fix(roadmaps): correct completionPercent double-count on repeat step completion

Scope: /domains/roadmaps/service.ts only, per prompt discipline.
```

---

## 5. Quick Reference Checklist

**Before sending a prompt:**
- [ ] Named the exact domain/file(s) in scope
- [ ] Stated what should NOT be touched
- [ ] Defined how you'll know the change is correct

**After receiving the change:**
- [ ] Read the full diff — every file touched
- [ ] Confirmed no domain-boundary violations (lint pass)
- [ ] Ran the full test suite, not just the touched domain
- [ ] Commit message maps cleanly to a single domain/scope

---

## 6. Project Invariants (Never Violate Without Explicit Approval)

The following are locked aspects of EntreSkill Hub that must not be changed by any scoped prompt unless the user explicitly authorizes it:

- **Authentication flow** (`/domains/auth`, `/lib/auth.ts`, NextAuth config) — DO NOT MODIFY.
- **Database schemas** (`/models/index.ts`) — schema changes require explicit user approval.
- **API contracts** — changing response shapes or HTTP methods requires explicit user approval.
- **Recommendation engine algorithm** (`/domains/recommendations/service.ts`) — core matching logic is stable.
- **Landing page** (`/app/page.tsx`) — UI and copy are finalized.
- **RBAC definitions** (`/lib/rbac.ts`) — role permissions are fixed for Phase 1.
