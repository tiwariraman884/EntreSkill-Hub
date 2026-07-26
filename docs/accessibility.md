# WCAG 2.1 AA Compliance Audit
## EntreSkill Hub

| | |
|---|---|
| **Version** | 1.0 |
| **Standard** | WCAG 2.1, Level AA |
| **Companion Docs** | PRD.md §8 (Non-Functional Requirements), Testing.md §5 |

---

## 1. Why This Matters Here

Accessibility is not a secondary concern for this platform — Persona 1 ("Skilled but Stuck") explicitly includes users with **low digital literacy on low-end devices and unreliable connectivity**, which overlaps heavily with accessibility best practice (simple navigation, clear contrast, low cognitive load, resilience to slow loading). Rural/low-bandwidth support (PRD §8) and WCAG AA compliance reinforce each other rather than competing for engineering time.

---

## 2. Compliance Checklist by WCAG Principle

### 2.1 Perceivable

| Criterion | Requirement | Implementation |
|---|---|---|
| 1.1.1 Non-text Content | All images/icons have alt text | Every `<img>`/icon component requires an `alt` prop; enforced via lint rule (`jsx-a11y/alt-text`) |
| 1.3.1 Info and Relationships | Semantic HTML structure | shadcn/ui components used as-is (already semantic); roadmap stepper uses proper heading hierarchy, not styled `<div>`s |
| 1.4.3 Contrast (Minimum) | 4.5:1 for normal text, 3:1 for large text | Tailwind theme tokens audited against contrast ratio before adoption; no text-on-image without a scrim/overlay |
| 1.4.4 Resize Text | Text resizable to 200% without loss of function | No fixed-pixel font sizing; `rem`-based Tailwind scale throughout |
| 1.4.10 Reflow | No horizontal scroll at 320px width | Mobile-first responsive layout (critical given target users are often mobile-only) |
| 1.4.11 Non-text Contrast | UI components/icons meet 3:1 contrast | Verified for form borders, progress bars, badges |

### 2.2 Operable

| Criterion | Requirement | Implementation |
|---|---|---|
| 2.1.1 Keyboard | All functionality available via keyboard | No mouse-only interactions (drag-to-reorder in Admin CMS has a keyboard-accessible alternative — up/down buttons) |
| 2.4.3 Focus Order | Logical, predictable tab order | Verified per page in manual QA pass; no positive `tabindex` values used |
| 2.4.4 Link Purpose | Link text descriptive out of context | No bare "Click here" links; all CTAs state their action ("View Roadmap," "Request Session") |
| 2.4.7 Focus Visible | Visible focus indicator on all interactive elements | Tailwind `focus-visible` ring utility applied globally, not suppressed |
| 2.5.5 Target Size | Touch targets ≥ 44×44px | Critical for mobile-first rural users; enforced in component library defaults |

### 2.3 Understandable

| Criterion | Requirement | Implementation |
|---|---|---|
| 3.1.1 Language of Page | `lang` attribute set | `<html lang="en">` (Hindi flagged for v2 localization — see PRD §16) |
| 3.2.3 Consistent Navigation | Nav structure consistent across pages | Shared layout components across `(dashboard)` and `(public)` route groups |
| 3.3.1 Error Identification | Form errors clearly identified | Zod validation errors rendered inline, associated with fields via `aria-describedby`, not color-only |
| 3.3.2 Labels or Instructions | All form fields labeled | shadcn/ui `Label` component paired with every input; no placeholder-only labeling |

### 2.4 Robust

| Criterion | Requirement | Implementation |
|---|---|---|
| 4.1.2 Name, Role, Value | Custom components expose correct ARIA | Roadmap stepper, notification bell, and Q&A thread built with proper `role`/`aria-*` attributes, not div soup |
| 4.1.3 Status Messages | Dynamic updates announced to screen readers | Toast notifications (e.g., "Step marked complete") use `aria-live="polite"` regions |

---

## 3. Testing Approach

1. **Automated:** axe-core integrated into Playwright E2E suite (Testing.md §5) — runs against every primary page (landing, assessment, dashboard, roadmap detail, resource library, mentor discovery, mentor session Q&A thread, notification feed, admin queues) on every CI run for the E2E suite.
2. **Manual keyboard walkthrough:** performed before each major release — complete the full U-02 → U-06 flow using only keyboard navigation, plus a separate pass through the mentor session Q&A thread (M-04) and the notification bell/feed (U-09), since both are dynamic, frequently-updating components that are easy to get wrong for keyboard/screen-reader users even when static pages pass.
3. **Screen reader spot-check:** NVDA (Windows) and VoiceOver (macOS/iOS) spot-checks on the assessment wizard, roadmap stepper, mentor session Q&A thread, and notification bell — the interaction-heavy, dynamically-updating surfaces where `aria-live` regions and focus management matter most.
4. **Contrast audit:** automated via axe-core plus a manual design-token review whenever the Tailwind theme is modified.

---

## 4. Known Gaps / Deferred Items

| Item | Status | Plan |
|---|---|---|
| Multi-language support (screen reader language switching) | Deferred to v2 | Tied to PRD §16 localization roadmap |
| Video content captions | Partial — required for admin/team-authored video, **recommended but not yet enforced** for mentor-uploaded video | To be made a hard requirement in the M-03 upload flow in a near-term iteration |
| Full native mobile app accessibility (VoiceOver/TalkBack native APIs) | N/A in v1 (mobile web only) | Applicable once native app work begins (PRD §16) |

---

## 5. Acceptance Criteria for "AA Compliant"

A release is considered WCAG 2.1 AA compliant when:
- Zero critical/serious axe-core violations across all primary pages in the automated E2E run.
- Manual keyboard walkthrough completes all core flows (Section 3.2) without a mouse.
- Screen reader spot-check confirms all interactive elements are announced with correct name/role/value.
- Contrast ratios verified against the current Tailwind theme tokens.

This checklist should be re-run before every production release that touches UI components, not just at initial launch.
