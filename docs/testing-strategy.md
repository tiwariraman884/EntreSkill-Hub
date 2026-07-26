# Testing Strategy & CI/CD
## EntreSkill Hub

| | |
|---|---|
| **Version** | 1.0 |
| **Companion Docs** | coverage-summary.md, Deployment.md |

---

## 1. Testing Philosophy

Given the platform's trust-sensitive domains (mentor verification, content approval, progress tracking), testing prioritizes **correctness of business logic and access control** over exhaustive UI snapshot coverage. The recommendation scoring engine, roadmap progress computation, and RBAC middleware are treated as **must-have 90%+ coverage** areas; presentational components are tested more lightly.

---

## 2. Test Pyramid

```
        ▲
       /E2E\          Playwright — critical user journeys only (~15-20 flows)
      /------\
     /Integr. \       API route + DB integration tests (in-memory MongoDB)
    /----------\
   /   Unit     \     Jest — services, scoring engine, validation schemas, utils
  /--------------\
```

| Layer | Tool | Target Coverage | What it covers |
|---|---|---|---|
| Unit | Jest + React Testing Library | 80%+ on `/domains/**/service.ts` | Business logic, scoring algorithm, Zod schemas, pure utility functions |
| Integration | Jest + `mongodb-memory-server` | Every Route Handler / Server Action | DB reads/writes, RBAC enforcement, cache invalidation triggers |
| E2E | Playwright | Critical paths only | Registration → assessment → recommendation → roadmap start → step completion; mentor application → verification → session request → completion; admin content approval flow |
| Accessibility | axe-core (via Playwright) | All primary pages | Automated WCAG checks, see Accessibility.md |
| Load/Performance | k6 (pre-launch only) | Key endpoints | See Performance.md |

---

## 3. Unit Testing Details

**Recommendation Engine (highest priority):**
- Deterministic scoring must be tested with fixed input fixtures and exact expected output — this logic directly determines the platform's core value proposition (PRD §12).
- Test cases: exact skill match, partial overlap, zero overlap (fallback triggered), experience-level weighting, rural/urban suitability tagging.

**Progress Calculation:**
- `completionPercent = completedStepIds.length / totalSteps` must be tested against: steps added after user started (denominator changes), steps removed, duplicate completion calls (idempotency).

**Validation Schemas (Zod):**
- Every schema in `/domains/**/schema.ts` gets boundary tests: required fields missing, wrong types, string length limits, enum violations.

**RBAC Middleware:**
- Test matrix: `{user, mentor, admin} × {public route, user route, mentor route, admin route}` — verifies exactly the expected `200`/`401`/`403` per combination.

---

## 4. Integration Testing Details

Run against an in-memory MongoDB instance (`mongodb-memory-server`) so tests are fast, isolated, and don't touch real data.

**Required integration test suites (one per domain module):**
- `auth`: registration, duplicate email, OAuth account linking, email verification gating, password reset token single-use enforcement, rate-limit triggering
- `assessment`: submit → recommendation recompute triggered, partial resubmission preserves untouched fields
- `roadmaps`: step completion writes correctly scoped to the requesting user only (no cross-user leakage), deactivated idea roadmap remains accessible to in-progress users
- `resources`: pending resources excluded from public `/api/resources`, approval flips visibility, cache invalidation fires
- `mentors`: unverified mentor not returned in discovery, session request → notification queued, session expiry sweep behavior
- `admin`: audit log entry written on every A-01/A-02 mutating action, non-admin requests to `/api/admin/*` rejected with `403`

---

## 5. E2E Testing (Playwright)

**Critical flows to automate (minimum set for v1 launch gate):**

1. New user: register (email) → verify email → complete assessment → view recommendations → start a roadmap → complete a step → see dashboard reflect progress.
2. OAuth user: sign in with Google → skip password creation → land on assessment.
3. Bookmark flow: bookmark an idea from the recommendation feed → find it under "Saved."
4. Mentor application: apply as mentor → (test seeds admin approval) → verified badge appears → profile discoverable.
5. Session request: user requests a mentor session → mentor confirms → Q&A message exchange → mentor marks completed → feedback prompt appears.
6. Admin content approval: mentor uploads resource → admin sees it in pending queue → approves → resource appears in public library.
7. Admin business idea curation: admin creates idea + roadmap + steps → idea appears in recommendation results for a matching test user.
8. Access control: non-admin user attempting to visit `/admin/*` is redirected/blocked.
9. Notifications: an event that should notify a user (e.g., mentor confirms a session, or a roadmap goes 7 days inactive) results in an in-app notification appearing with correct unread state, and — where applicable — a transactional email being triggered; marking it read updates the unread-count badge; disabling a non-critical notification category in preferences suppresses future notifications of that type without affecting transactional/security emails.
10. Mentor engagement dashboard: a mentor with a mix of completed, no-show, and pending sessions plus at least one approved resource logs in and sees session counts, unique mentee count, average rating, and resource performance stats that match the seeded test data exactly — and confirms the mentor cannot see another mentor's stats.

Run against a staging deployment (not production) in CI, using seeded/reset test data per run.

---

## 6. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml (representative structure)
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  unit-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - run: npm run test:integration
      - uses: actions/upload-artifact@v4
        with: { name: coverage-report, path: coverage/ }

  e2e:
    runs-on: ubuntu-latest
    needs: [lint-typecheck, unit-integration]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
        env:
          E2E_BASE_URL: ${{ secrets.STAGING_URL }}

  build:
    runs-on: ubuntu-latest
    needs: [lint-typecheck, unit-integration]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build

  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: [build]
    runs-on: ubuntu-latest
    steps:
      - run: echo "Vercel auto-generates preview deployments per PR"

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: [unit-integration, e2e, build]
    runs-on: ubuntu-latest
    steps:
      - run: echo "Vercel deploys main branch to production on merge"
```

**Merge gate to `main`:** lint, typecheck, unit, integration, and build must all pass. E2E runs against the PR's Vercel preview URL and is a required check for anything touching auth, roadmaps, mentors, or admin domains (labelled via a `needs-e2e` PR label to keep CI time reasonable on trivial changes).

---

## 7. Test Data & Fixtures

- Seed script (`scripts/seed-test-data.ts`) populates: sample `Skill` taxonomy, 3–5 `BusinessIdea` + `Roadmap` combos across difficulty levels, one verified and one pending `MentorProfile`, sample `LearningResource` items in each approval state.
- Fixtures kept in `/tests/fixtures` as typed factory functions (`makeUser()`, `makeBusinessIdea()`, etc.) rather than static JSON, so tests can override only the fields relevant to the case being tested.

---

## 8. Coverage Reporting

Coverage is generated on every CI run and published as `coverage-summary.md` (see that document for the current baseline table format). Coverage thresholds enforced in CI config:

```json
{
  "coverageThreshold": {
    "global": { "statements": 75, "branches": 70, "functions": 75, "lines": 75 },
    "./src/domains/recommendations/": { "statements": 90 },
    "./src/domains/roadmaps/": { "statements": 85 },
    "./src/lib/auth.ts": { "statements": 90 }
  }
}
```
A PR that drops coverage below these thresholds fails CI.
