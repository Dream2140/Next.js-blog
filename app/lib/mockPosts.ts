import type { BlogDto } from "@/app/lib/posts";

const COVER_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80",
];

const TOPICS = [
  {
    title: "Shipping React Server Components Without Losing Your Mind",
    lead:
      "React Server Components become manageable when we treat them as a rendering boundary, not as a magical replacement for the whole app.",
    details: [
      "The practical pattern is simple: fetch on the server, keep interactivity small, and pass stable primitives into client components.",
      "Most team pain comes from unclear ownership between server and client files, so the real win is documentation and folder discipline.",
      "If a component needs browser state, event handlers, or local transitions, we keep it client-side and let the server component compose around it.",
    ],
  },
  {
    title: "A Senior-Friendly CSS Architecture for Large Next.js Apps",
    lead:
      "CSS starts scaling when tokens, layout primitives, and content styles are separated before the component library grows out of control.",
    details: [
      "A clean system usually has three layers: foundations, semantic tokens, and component-specific rules with strict naming.",
      "The design debt often appears not in colors but in spacing inconsistency, typography drift, and too many one-off utility combinations.",
      "When teams align on shell, section, card, and form primitives early, product screens become far easier to assemble and review.",
    ],
  },
  {
    title: "Prisma in Production: What Actually Hurts and How to Avoid It",
    lead:
      "Prisma feels effortless in development, but production friction usually comes from connection strategy, migration discipline, and hidden query costs.",
    details: [
      "The first rule is to make database access explicit in server-only modules so build-time and runtime concerns are easy to reason about.",
      "The second rule is to log slow queries and failed initializations with enough metadata to debug incidents without guessing.",
      "If the app depends on external data to render critical routes, graceful fallback is not optional, it is part of the product experience.",
    ],
  },
  {
    title: "The Form Validation Stack I Reach For in 2026",
    lead:
      "The most resilient form stack is still boring on purpose: native inputs, shared schemas, predictable errors, and server-authoritative validation.",
    details: [
      "Client-side validation should improve speed and clarity, but it should never be the only layer that protects data integrity.",
      "Shared schemas keep request parsing, API handlers, and UI error messages aligned even as flows evolve.",
      "Teams move faster when every mutation returns a stable error shape that UI components can render without special-case parsing.",
    ],
  },
  {
    title: "How We Finally Stopped Breaking SEO in App Router",
    lead:
      "SEO regressions in App Router usually come from dynamic rendering decisions made too early and metadata handled too late.",
    details: [
      "The healthy pattern is to let content routes own their metadata, canonicals, and social previews close to the data they render.",
      "Preview and fallback logic should be intentional because search engines punish inconsistent titles, missing descriptions, and duplicate routes.",
      "Once the basics are stable, sitemap, robots, and structured data become straightforward operational work instead of mystery debugging.",
    ],
  },
  {
    title: "API Route Design for Teams That Hate Surprises",
    lead:
      "Senior-feeling APIs do not try to be clever. They return consistent status codes, typed payloads, and observability hooks from day one.",
    details: [
      "Predictable APIs lower cognitive load across frontend, backend, QA, and support because everyone learns the same failure patterns.",
      "Validation belongs at the boundary, and business logic belongs in services that can be tested without the network.",
      "When logs include route, actor, result, and latency, incident response gets dramatically faster.",
    ],
  },
  {
    title: "Why Most Monorepos Feel Slower Than They Should",
    lead:
      "A monorepo becomes leverage only when package boundaries are clear and the default developer workflow stays quick.",
    details: [
      "Teams often over-centralize too early, which creates giant shared packages nobody wants to touch and everybody depends on.",
      "The healthier move is to extract only proven seams such as design tokens, auth helpers, and domain contracts.",
      "Build caching helps, but human clarity about ownership helps even more.",
    ],
  },
  {
    title: "Server Actions: Powerful, Useful, and Easy to Misuse",
    lead:
      "Server Actions shine when they model small product mutations with tight UI coupling, not when they replace every backend interface blindly.",
    details: [
      "They are at their best for authenticated form submissions, lightweight preferences, and internal dashboards.",
      "They become messy when hidden side effects, broad invalidation, or cross-team API reuse enter the picture.",
      "If we keep them small, typed, and paired with cache strategy, they feel elegant instead of magical.",
    ],
  },
  {
    title: "The Performance Budget Checklist We Actually Follow",
    lead:
      "Performance improves when it is treated like a product constraint with explicit budgets, not a vague aspiration left for later.",
    details: [
      "The shortest path to better UX is usually removing unnecessary client JavaScript and stabilizing critical route waterfalls.",
      "Image policy, font loading, and bundle ownership should be reviewed the same way teams review API contracts.",
      "Once budgets are visible in CI and dashboards, optimization work becomes easier to prioritize.",
    ],
  },
  {
    title: "Design Systems Fail When They Ignore Content Reality",
    lead:
      "A design system breaks down the moment it optimizes only for perfect mockups and not for messy real content.",
    details: [
      "Long titles, empty states, multilingual labels, and low-quality images reveal whether the system is truly resilient.",
      "The strongest component libraries define constraints, not just pretty defaults.",
      "Content-aware design reviews catch more production bugs than another round of pixel polishing.",
    ],
  },
  {
    title: "Production Logging for Frontend-Heavy Apps",
    lead:
      "Frontend-heavy systems still need backend-grade logs because the hardest bugs often happen between UI events and server mutations.",
    details: [
      "Structured logs make it possible to correlate user actions, route handlers, and downstream failures without reading vague console output.",
      "A small shared logging shape can unify server actions, API handlers, and background jobs.",
      "The goal is not verbosity, it is enough context to debug quickly while respecting privacy.",
    ],
  },
  {
    title: "State Management After the Hype Cycle",
    lead:
      "Most teams need less global state than they think and more deliberate boundaries than they currently have.",
    details: [
      "URL state, server state, and local interactive state should not automatically live in the same abstraction.",
      "When state libraries become a default instead of a decision, they often hide poor data flow rather than solving it.",
      "Simple composition plus a few purposeful stores beats accidental architecture almost every time.",
    ],
  },
  {
    title: "Accessible UI Is Easier When It Starts in the Component API",
    lead:
      "Accessibility becomes sustainable when semantics, focus rules, and announcements are built into components instead of patched onto screens later.",
    details: [
      "The real productivity gain is consistency: every modal, toast, and input behaves the same under keyboard and screen reader use.",
      "Good defaults reduce review noise and let designers and engineers discuss intent instead of re-finding the same gaps.",
      "Teams that treat accessibility as a first-class API concern usually ship faster and with more confidence.",
    ],
  },
  {
    title: "The Real Cost of Overusing useEffect",
    lead:
      "Overused effects create timing bugs, duplicated fetches, and fragile mental models that are hard to untangle six months later.",
    details: [
      "A surprising number of effects disappear once we move data fetching to the server and derive UI state directly from props.",
      "When an effect remains, it should usually synchronize with an external system rather than compute ordinary render output.",
      "Reviewing effects as if they were infrastructure code catches a lot of instability early.",
    ],
  },
  {
    title: "Content Modeling for Blogs That Want to Grow Up",
    lead:
      "A blog stops feeling like a side project when the content model supports publishing workflows, discoverability, and future editorial tools.",
    details: [
      "Even a small platform benefits from slug, excerpt, status, publish date, author metadata, and revision-friendly body structure.",
      "A weak model forces the frontend to infer too much, which creates brittle UI and awkward migrations.",
      "Strong content primitives make SEO, archive views, related posts, and drafts almost trivial to add later.",
    ],
  },
  {
    title: "A Better Error Strategy for Full-Stack JavaScript Apps",
    lead:
      "The best error strategy is one that helps both users and developers without leaking implementation details to either side.",
    details: [
      "Users need calm, actionable recovery paths, while engineers need typed categories, traceability, and reliable logs.",
      "An explicit error model turns random try-catch blocks into a system that can be tested and monitored.",
      "If every failure becomes either a domain error or an infrastructure error, support conversations get much simpler.",
    ],
  },
  {
    title: "Why CI Pipelines Should Feel Boring",
    lead:
      "A healthy CI pipeline is intentionally boring: fast, deterministic, visible, and hard to bypass accidentally.",
    details: [
      "The pipeline should answer one question clearly: is this change safe enough to merge and deploy.",
      "Lint, typecheck, tests, and build are still the baseline because they remove whole classes of avoidable failure.",
      "The more predictable the feedback loop, the more teams trust it instead of fighting it.",
    ],
  },
  {
    title: "Edge Runtime or Node Runtime? Pick With Intent",
    lead:
      "Runtime choice should come from product constraints and dependency shape, not from trend pressure or benchmark screenshots.",
    details: [
      "Edge works well for lightweight request handling close to the user, but it changes what packages and data flows are practical.",
      "Node remains the calmer default for apps with heavier libraries, complex auth, or richer database access patterns.",
      "A mixed strategy often delivers the most value if the boundaries are explicit.",
    ],
  },
  {
    title: "Web Security Basics That Still Get Missed",
    lead:
      "Most web security incidents do not require exotic attackers, only ordinary omissions repeated in busy teams.",
    details: [
      "Input validation, auth boundaries, secret handling, rate limiting, and safe defaults are still where the most leverage lives.",
      "Security posture improves fastest when product code and platform code share the same checklist and ownership.",
      "The goal is not fear, it is predictable defense against common mistakes.",
    ],
  },
  {
    title: "A Practical Guide to Feature Flags in Small Teams",
    lead:
      "Feature flags become useful long before you need a large platform, as long as you keep scope, naming, and cleanup disciplined.",
    details: [
      "Flags help decouple deploy from release, reduce risky launches, and let teams validate assumptions with less drama.",
      "They become debt when nobody owns expiration and the codebase starts serving too many realities at once.",
      "Small teams can still get big value with a modest convention and a ruthless cleanup habit.",
    ],
  },
  {
    title: "How to Review Frontend PRs Like a Staff Engineer",
    lead:
      "The strongest frontend reviews focus on user impact, correctness, resilience, and maintainability before style preferences.",
    details: [
      "A useful review asks whether the change introduces hidden state, rendering costs, a11y regressions, or brittle APIs.",
      "Review comments land better when they explain risk and tradeoff instead of just declaring taste.",
      "Teams get better faster when reviews teach reusable principles, not only file-specific fixes.",
    ],
  },
  {
    title: "Incremental Adoption of Type Safety Across the Stack",
    lead:
      "Type safety pays off most when contracts are introduced at boundaries first rather than sprayed across the codebase indiscriminately.",
    details: [
      "The high-value boundaries are request parsing, persistence models, env validation, and reusable domain objects.",
      "Strong types are not a substitute for runtime validation, but the two reinforce each other well.",
      "Incremental adoption works when teams target unstable seams instead of chasing perfect coverage.",
    ],
  },
  {
    title: "The Case for Boring UI Primitives",
    lead:
      "Boring UI primitives are a force multiplier because they make product screens easier to build, test, and restyle without fear.",
    details: [
      "Buttons, inputs, dialogs, and cards should be intentionally plain but structurally solid so teams can move quickly on top of them.",
      "A stable primitive layer reduces design drift and frees time for more meaningful product differentiation.",
      "Once the base is trustworthy, custom visuals become cheaper rather than riskier.",
    ],
  },
  {
    title: "Image Strategy for Modern Content Platforms",
    lead:
      "Image handling is a product concern, not just an optimization checkbox, because it shapes performance, editorial workflow, and visual trust.",
    details: [
      "A strong strategy defines allowed hosts, fallback behavior, upload guidance, and defaults for crop and quality.",
      "Editorial teams move faster when image rules are enforced in tooling instead of buried in tribal knowledge.",
      "The frontend becomes more resilient when placeholders and error states are first-class UI elements.",
    ],
  },
  {
    title: "When to Split a Service and When to Keep It Together",
    lead:
      "The right service boundary is usually discovered through ownership and failure modes, not because a diagram looks cleaner with more boxes.",
    details: [
      "Premature splitting multiplies deployment, observability, and consistency problems before it creates meaningful independence.",
      "A well-structured modular monolith often beats a scattered service landscape for small and medium teams.",
      "Splitting starts making sense when scaling pressure, team boundaries, and operational needs align.",
    ],
  },
  {
    title: "Cache Invalidation in Next.js Without Folklore",
    lead:
      "Caching gets dramatically easier once a team writes down which data must be fresh, which can be reused, and who invalidates what.",
    details: [
      "Confusion usually comes from mixing route rendering strategy with data freshness policy and mutation side effects.",
      "When invalidation is attached to clear domain events, the app becomes easier to reason about under change.",
      "The best cache strategy is rarely the most aggressive one, it is the most understandable one.",
    ],
  },
  {
    title: "Why Product Dashboards Need Information Architecture",
    lead:
      "Dashboards feel senior when they reflect operator priorities, not when they simply display every metric and action in one place.",
    details: [
      "A good dashboard guides decision-making by grouping workflows, surfacing anomalies, and reducing visual noise.",
      "The fastest way to improve a weak dashboard is to identify the two or three main jobs people actually come to complete.",
      "Hierarchy and language matter more than another row of summary cards.",
    ],
  },
  {
    title: "Local Developer Experience Is a Product Too",
    lead:
      "Teams underestimate how much delivery speed depends on startup time, clear scripts, stable seeds, and low-friction debugging.",
    details: [
      "A clean onboarding path compounds over time because every new teammate and every new machine follows the same paved road.",
      "The easiest DX wins are often deterministic commands, environment validation, and better failure messages.",
      "When local development is smooth, people experiment more and fear the codebase less.",
    ],
  },
  {
    title: "Writing Better Architecture Docs for Fast Teams",
    lead:
      "Architecture docs should make decisions legible, not perform intelligence. The best ones reduce repeated debate and speed up onboarding.",
    details: [
      "A useful doc explains context, decision, tradeoffs, and consequences in language a new engineer can understand quickly.",
      "Short docs linked from real modules outperform giant documents nobody updates.",
      "Documentation becomes durable when it is written close to change rather than months after the fact.",
    ],
  },
  {
    title: "Release Engineering Habits That Prevent Chaos",
    lead:
      "Stable releases depend less on heroics and more on simple habits repeated consistently across engineering and product.",
    details: [
      "Clear promotion paths, small deploys, rollback readiness, and visible ownership create calm during high-pressure launches.",
      "A release checklist should exist to protect focus, not to satisfy bureaucracy.",
      "When incidents do happen, lightweight retrospectives turn pain into capability.",
    ],
  },
  {
    title: "The Frontend Observability Stack I Wish Teams Adopted Earlier",
    lead:
      "Frontend observability becomes powerful when logs, traces, and user-facing failures tell one coherent story instead of living in isolated tools.",
    details: [
      "Error reporting is the start, not the finish. We also need route timing, mutation outcomes, and enough context to reproduce issues.",
      "Instrumenting a few high-value journeys often teaches more than sprinkling analytics everywhere.",
      "The real win is shorter time from bug report to confident fix.",
    ],
  },
];

function buildPostText(lead: string, details: string[], index: number) {
  return [
    lead,
    details[0],
    details[1],
    details[2],
    `Field note ${String(index + 1).padStart(2, "0")}: the goal is not theoretical purity, but a codebase that stays understandable under daily product pressure.`,
  ].join("\n\n");
}

export const MOCK_POSTS: BlogDto[] = TOPICS.map((topic, index) => {
  const month = index % 12;
  const day = (index % 27) + 1;

  return {
    id: `mock-${String(index + 1).padStart(3, "0")}`,
    name: topic.title,
    createdAt: new Date(Date.UTC(2026, month, day, 9 + (index % 8), 15, 0)).toISOString(),
    image: COVER_IMAGES[index % COVER_IMAGES.length],
    text: buildPostText(topic.lead, topic.details, index),
    userId: "mock-system",
    likedIds: Array.from({ length: (index % 5) + 1 }, (_, likeIndex) => `mock-like-${index}-${likeIndex}`),
  };
}).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
