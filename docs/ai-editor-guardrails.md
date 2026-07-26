# AI Editor Guardrails — Scoped Change Discipline
## EntreSkill Hub

| | |
|---|---|
| **Version** | 1.0 |
| **Purpose** | Prevent AI coding editors (Cursor, Claude Code, Copilot) from making unintended changes outside the scope of a given prompt — especially once the project is mid-build and has enough surface area for an editor to start "helpfully" touching things it wasn't asked to |
| **Companion Docs** | Architecture.md (domain isolation is the main structural defense), Testing.md (CI is the safety net) |

---

## 1. Why This Happens

AI editors drift from scope for a few predictable reasons, and understanding *why* is what makes the mitigations below actually work rather than being arbitrary rules:

1. **Large context windows encourage "while I'm in here" behavior.** Once an editor has read several related files to answer a small prompt, it has the context to also "improve" adjacent code — and models are trained to be helpful, which biases toward doing more, not less.
2. **Ambiguous prompts get filled in with assumptions.** "Fix the roadmap progress bug" has many possible interpretations; without a tight scope, the editor picks one and may refactor around it.
3. **Weak project boundaries invite cross-cutting edits.** If a "fix" to the recommendation engine can technically also touch shared utility files, auth helpers, or UI primitives, the editor may follow that thread because nothing stops it from doing so.
4. **Long conversations accumulate implicit context.** By the middle of a project, the editor has seen many past decisions and can start "correcting" earlier code toward patterns it saw more recently, even when nobody asked it to.
5. **No enforced diff review step.** If changes are accepted wholesale without a scoped diff review, drift compounds silently over many small prompts.

The mitigations below attack each of these causes directly — structural isolation (Section 2), prompt discipline (Section 3), and process gates (Section 4) — rather than relying on just "asking the editor nicely."

---

## 2. Structural Defenses (Do This Once, Benefits Every Prompt After)

### 2.1 Domain isolation is your primary defense
Architecture.md already defines domain boundaries (`/domains/auth`, `/domains/roadmaps`, etc.) with a hard rule: **domains do not import each other's `model.ts` directly.** This is not just a code-quality preference — it's what makes scoped prompting possible. If "fix the bookmark toggle" can only touch files inside `/domains/bookmarks/`, the editor has nowhere else to wander even if it wanted to.

**Enforcement:**
- Add an ESLint rule (`eslint-plugin-boundaries` or a custom rule) that fails the build if a file in one domain imports a `model.ts`/`service.ts` internals from another domain.
- Treat any PR that violates domain boundaries as a signal the prompt itself was under-scoped, not just a code review nitpick.

### 2.2 Keep shared code intentionally small and stable
Files in `/lib` and `/components` (shared UI) are the highest-risk surface for cross-feature drift, because *every* domain touches them. Two rules:
- Shared code changes are **never** an incidental side-effect of a feature prompt. If a feature genuinely needs a shared utility changed, that's a separate, explicit prompt (see Section 3.3).
- Prefer domain-local duplication over a premature shared abstraction. A little repeated code across two domains is cheaper than a shared function that becomes a magnet for "just this one edge case" changes that ripple everywhere.

### 2.3 One feature, one branch, one PR
Never let a single branch accumulate multiple unrelated feature prompts. Each small-prompt change should be its own branch/commit, reviewed in isolation. This makes it trivial to spot scope creep in a diff — a "fix the roadmap step counter" PR that also touches `auth.ts` is an immediate red flag in review, whereas the same change buried inside a larger multi-feature branch is easy to miss.

---

## 3. Prompt Discipline (What You Actually Type)

### 3.1 The scoped-prompt template
Use this structure for every small change, especially mid-project:

```
SCOPE: [exact feature/file(s) this touches — name the domain folder]
CHANGE: [exactly what should change, described precisely]
DO NOT TOUCH: [explicitly list adjacent things that might look related but aren't in scope]
ACCEPTANCE: [how you'll know it's correct — e.g., "the existing X test still passes, Y test now passes"]
```

**Example:**
```
SCOPE: /domains/roadmaps only — specifically the completionPercent calculation in service.ts
CHANGE: Fix the bug where completionPercent shows >100% when a step is completed twice.
DO NOT TOUCH: The UserProgress schema, the API route handler, or any other domain's files.
ACCEPTANCE: Calling the complete-step endpoint twice on the same step results in completionPercent
capping correctly and completedStepIds has no duplicates.
```

This is more typing than "fix the progress bug," but it converts an ambiguous request into a bounded one — the editor has no room to interpret "fix" as "also refactor this while I'm here."

### 3.2 Explicitly forbid refactoring unless asked
Add this as a standing instruction in your AI editor's system-level config (`.cursorrules`, `CLAUDE.md`, or equivalent — see Section 5):
> "Never refactor, rename, reformat, or 'clean up' code outside the exact scope of the current prompt, even if you notice something that looks improvable. If you notice an issue outside scope, report it in your response instead of fixing it."

This single instruction eliminates the majority of "helpful but unwanted" drift, because it removes the ambiguity between "fix this bug" and "fix this bug and anything else you spot nearby."

### 3.3 Shared/cross-cutting changes get their own explicit prompt
If a small feature prompt genuinely requires a shared file to change (e.g., a new Zod validator needed by two domains), don't let the editor infer that — say so directly:
```
SCOPE: This prompt intentionally touches /lib/validators.ts (shared) because both
/domains/roadmaps and /domains/resources need the new validator. This is expected —
do not extend the change to any other shared file beyond this one.
```
Naming the exception explicitly is what keeps "shared file changes" rare and deliberate instead of a silent side-channel for scope creep.

### 3.4 Reference the exact file path, not just the feature name
"Fix the mentor session bug" is weaker than "Fix the bug in `/domains/mentors/service.ts`, in the `confirmSession` function." The more precisely you name the target, the less room the editor has to widen its search — and widening its search is usually the first step toward touching unrelated code.

---

## 4. Process Gates (What Catches Drift If It Still Happens)

Even with structural and prompt discipline, review the actual diff every time — this is the last line of defense and should never be skipped, especially mid-project when trust in the editor tends to quietly increase past the point it should.

### 4.1 Always review the full diff before accepting
Never accept an AI editor's change set without reading `git diff` end to end. Specifically look for:
- Files touched that weren't named in your `SCOPE:` line.
- Import statements added/removed in files you didn't ask about.
- Formatting-only changes to files outside scope (a common "invisible" drift vector — the logic didn't change, but now every future diff on that file is noisier).
- Renamed variables/functions in code you didn't ask to touch.

### 4.2 Run the domain-boundary lint rule (Section 2.1) on every diff
This turns "did the editor cross a domain boundary" from a manual review question into an automated pass/fail check.

### 4.3 Run the full test suite, not just the touched domain's tests
A scoped change that's genuinely scoped shouldn't break tests elsewhere. If it does, that's evidence the change had unintended reach even if the diff looked clean — treat any unexpected test failure outside the target domain as a signal to re-scope the prompt, not just a bug to patch over.

### 4.4 Commit messages should restate the scope
```
fix(roadmaps): correct completionPercent double-count on repeat step completion

Scope: /domains/roadmaps/service.ts only, per prompt discipline.
```
This creates a paper trail that makes it easy to audit, weeks later, whether scope discipline has been holding — if you start seeing commit messages that don't cleanly map to a single domain, that's an early warning sign before it becomes a bigger cleanup problem.

---

## 5. Configuring This Into Your AI Editor Directly

Rather than repeating scope-discipline instructions in every prompt, bake the standing rules into your editor's persistent config file so they apply automatically:

**`.cursorrules` / `CLAUDE.md` (add this section):**
```
## Scope Discipline (read before every change)

- Only modify files explicitly named or clearly required by the current request's SCOPE.
- Never refactor, rename, reformat, or "improve" code outside that scope, even if it looks
  improvable. If you notice something outside scope, mention it in your response — do not fix it.
- Never modify files in /lib or /components as a side effect of a domain-specific feature
  change unless the prompt explicitly says the shared file is in scope.
- Never cross domain boundaries (see Architecture.md) — a change inside /domains/X should not
  touch /domains/Y's model.ts, service.ts, actions.ts, or queries.ts.
- If a request is ambiguous about scope, ask for clarification on which files/domains are
  affected before making changes, rather than guessing broadly.
- When done, summarize exactly which files were changed and why each one was necessary —
  do not summarize "what was improved" if it wasn't asked for.
```

This mirrors the same instructions from Section 3.2–3.3 but makes them persistent, so you don't have to re-type them into every small prompt — you only need the lightweight `SCOPE:`/`CHANGE:` template per request from then on.

---

## 6. Quick Reference Checklist

Before sending a small-change prompt:
- [ ] Named the exact domain/file(s) in scope
- [ ] Stated what should NOT be touched, if anything adjacent could plausibly be confused for in-scope
- [ ] Defined how you'll know the change is correct

After receiving the change:
- [ ] Read the full diff — every file touched
- [ ] Confirmed no domain-boundary violations (lint pass)
- [ ] Ran the full test suite, not just the touched domain
- [ ] Commit message maps cleanly to a single domain/scope

If any of the "after" checks fail, don't just fix the extra changes and move on — that's the moment to notice the pattern and tighten either the prompt template or the `.cursorrules` config, since one instance of drift is a warning that more will follow if the underlying cause isn't addressed.
