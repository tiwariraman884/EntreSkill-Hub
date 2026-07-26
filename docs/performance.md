# Performance Optimization Guide
## EntreSkill Hub

| | |
|---|---|
| **Version** | 1.0 |
| **Companion Docs** | PRD.md §8, Architecture.md §5 (Caching Strategy) |

---

## 1. Performance Budget

Per PRD §8: **page load < 3 seconds on 3G-equivalent connections.** This is treated as a hard budget, not an aspiration, given the target user base includes rural, low-bandwidth users on mid/low-end mobile devices.

| Metric | Target | Rationale |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5s | Core Web Vital, directly tied to the 3s budget |
| First Input Delay (FID) / Interaction to Next Paint (INP) | < 200ms | Ensures forms (assessment wizard) feel responsive |
| Cumulative Layout Shift (CLS) | < 0.1 | Prevents mis-taps on mobile — critical for low-literacy users navigating unfamiliar UI |
| Time to Interactive (TTI) on 3G | < 3s | Direct PRD requirement |
| JS bundle size (initial route) | < 150KB gzipped | Keeps parse/execute time low on low-end devices |
| Image payload per page | < 500KB total | Given bandwidth constraints |

---

## 2. Frontend Optimization

- **Server Components by default:** Next.js 15 App Router — only components that need interactivity (forms, the roadmap stepper, notification bell) are Client Components. This minimizes shipped JavaScript.
- **Route-based code splitting:** automatic via App Router; admin CMS bundle is never shipped to regular users, mentor dashboard bundle never shipped to non-mentors.
- **Image optimization:** `next/image` for all raster images — automatic responsive sizing, lazy loading below the fold, modern format (WebP/AVIF) negotiation.
- **Font loading:** self-hosted via `next/font` with `font-display: swap` to avoid render-blocking web font requests.
- **Skeleton/loading states:** every data-dependent view (recommendations, dashboard, roadmap) ships a skeleton state so perceived performance stays high even when the actual fetch takes longer on slow connections.
- **Avoid layout shift:** all images/media have explicit dimensions reserved before load; ad-hoc dynamic content (notification badges, etc.) reserves space rather than pushing layout.

---

## 3. Backend & Data Optimization

- **Caching strategy:** see Architecture.md §5 — the recommendation-relevant `BusinessIdea` list and approved `LearningResource` queries are Redis-cached, since these are read far more often than they change.
- **Database indexing:** see ERD.md §3 — every high-frequency query path (recommendation candidate filtering, mentor discovery, dashboard progress lookup) has a supporting compound index.
- **N+1 prevention:** roadmap step resource references are resolved via a single batched query (`$in` on resource IDs), never per-step round trips.
- **Pagination everywhere:** no unbounded list endpoint exists (API.md §1) — admin user lists, resource libraries, and notification feeds are all paginated server-side.
- **Read-time computation kept cheap:** `completionPercent` is computed at read time (ERD.md §2) rather than cached, but this is a cheap array-length division, not a heavy aggregation — deliberately chosen to avoid a much more expensive cache-invalidation problem for a small compute cost.

---

## 4. Feature-Specific Performance Notes

**Mentor Discovery (U-08):** the `/api/mentors` list is filtered by `expertiseAreas` and `availabilityDay` against only `verified` mentors (ERD.md §3 index: `{ verificationStatus: 1, expertiseAreas: 1 }`). As the mentor pool grows, this query must stay index-backed rather than falling back to a collection scan — verified in MongoDB Atlas Performance Advisor (Section 5) whenever mentor volume increases materially. Mentor profile photos are served through `next/image` with a fixed thumbnail size on the discovery grid (full-resolution only loads on the individual profile page) to keep the list view light.

**Admin Analytics (A-04):** the admin dashboard never computes funnel/trend numbers live on page load — per Architecture.md §6, a nightly job pre-aggregates this data, and only the current day's activity is queried live and merged in. This keeps the admin dashboard fast regardless of total platform data volume, and means admin-side performance does not degrade as `User`, `UserProgress`, or `MentorSession` collections grow — a deliberate tradeoff of same-day data freshness for consistent load time, acceptable since this dashboard is a trend/health view, not an operational real-time tool.

## 5. Low-Bandwidth / Rural User Optimizations

Given this is a stated PRD priority (not a generic nice-to-have), specific measures beyond standard web performance practice:

- **Video content:** thumbnail + explicit "tap to load video" pattern rather than autoplay/preload, so users on limited data plans aren't charged for content they didn't ask to stream.
- **Checklist and article content prioritized in low-connectivity contexts:** where a roadmap step has both a video and a text/checklist alternative, the text version loads first, with the video offered as a secondary, explicitly-triggered option.
- **Aggressive HTTP caching headers** on static assets and rarely-changing API responses (e.g., `Skill` taxonomy) to reduce repeat-visit data usage.
- **Offline resilience (stretch goal, not a v1 hard requirement):** service-worker-based caching of the last-viewed roadmap so a user who loses connectivity mid-session doesn't lose their place — flagged as a fast-follow enhancement rather than launch-blocking.

---

## 6. Monitoring Performance in Production

| Tool | Purpose |
|---|---|
| Vercel Analytics (Web Vitals) | Real-user LCP/FID/CLS/INP tracking, segmented by device/connection where available |
| Vercel Speed Insights | Route-level performance regression tracking across deployments |
| k6 load testing | Pre-launch and pre-major-release load tests against staging for the highest-traffic endpoints: `/api/recommendations`, `/api/roadmaps/:id`, `/api/resources` |
| MongoDB Atlas Performance Advisor | Flags missing/unused indexes and slow queries in production |

**Regression gate:** a release that drops Lighthouse performance score below 85 on the primary landing/assessment/dashboard routes should not ship without explicit review — wired as an informational (non-blocking in v1, upgradeable to blocking) check in CI.

---

## 7. Performance Testing Checklist (Pre-Release)

- [ ] Lighthouse run on landing, assessment, recommendations, roadmap detail, dashboard, resource library, mentor discovery pages
- [ ] Bundle analyzer reviewed for any route exceeding the 150KB budget
- [ ] Throttled 3G test (Chrome DevTools network throttling) walkthrough of the full U-02 → U-06 flow
- [ ] k6 load test against staging for recommendation and roadmap endpoints at expected peak concurrency
- [ ] No new N+1 query patterns introduced (reviewed in PR for any new list-rendering feature)
