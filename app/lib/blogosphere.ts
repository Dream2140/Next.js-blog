import type { BlogDto } from "@/app/lib/posts";

export interface BlogosphereSection {
  type: "h2" | "p" | "quote" | "code";
  text: string;
  lang?: string;
}

export interface BlogospherePost extends BlogDto {
  slug: string;
  subtitle: string;
  excerpt: string;
  readTime: number;
  claps: number;
  comments: number;
  tags: string[];
  body: BlogosphereSection[];
}

const TAG_POOL = [
  ["react", "rsc", "suspense"],
  ["typescript", "tooling", "perf"],
  ["css", "platform", "design"],
  ["security", "auth", "nextjs"],
  ["workflow", "vim", "frontend"],
  ["forms", "api", "validation"],
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toSentences(text: string) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function chunkText(text: string) {
  const normalized = text.replace(/\r/g, "").trim();
  if (!normalized) {
    return [];
  }

  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return normalized
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function makeBody(post: BlogDto, excerpt: string): BlogosphereSection[] {
  const chunks = chunkText(post.text);
  const sections: BlogosphereSection[] = [
    { type: "h2", text: "01 — Overview" },
    { type: "p", text: chunks[0] || excerpt },
  ];

  if (chunks[1]) {
    sections.push({ type: "h2", text: "02 — Notes" });
    sections.push({ type: "p", text: chunks[1] });
  }

  sections.push({
    type: "quote",
    text:
      excerpt.length > 0
        ? excerpt
        : "The implementation is still evolving, but the interface is ready for the next backend phase.",
  });

  if (chunks[2]) {
    sections.push({ type: "h2", text: "03 — Details" });
    sections.push({ type: "p", text: chunks.slice(2).join("\n\n") });
  }

  sections.push({
    type: "code",
    lang: "tsx",
    text: `export async function getPostPreview(id: string) {\n  return fetch(\`/api/blog/\${id}\`, { cache: "no-store" });\n}`,
  });

  return sections;
}

export function toBlogospherePost(post: BlogDto, index = 0): BlogospherePost {
  const sentences = toSentences(post.text);
  const excerpt = (sentences[0] || post.text).slice(0, 220).trim();
  const subtitle =
    sentences[1]?.slice(0, 120) ||
    "A terminal-inspired post card while richer editorial metadata is still being built.";
  const readTime = Math.max(3, Math.round(post.text.split(/\s+/).filter(Boolean).length / 180));
  const claps = 120 + index * 73 + post.name.length * 3;
  const comments = 8 + (post.text.length % 37);
  const tags = TAG_POOL[index % TAG_POOL.length];

  return {
    ...post,
    slug: slugify(post.name || `post-${post.id}`),
    excerpt,
    subtitle,
    readTime,
    claps,
    comments,
    tags,
    body: makeBody(post, excerpt),
  };
}

export function toBlogospherePosts(posts: BlogDto[]) {
  return posts.map((post, index) => toBlogospherePost(post, index));
}

export function groupPostsByMonth(posts: BlogospherePost[]) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

  const groups = new Map<string, BlogospherePost[]>();

  posts.forEach((post) => {
    const label = formatter.format(new Date(post.createdAt));
    const current = groups.get(label) || [];
    current.push(post);
    groups.set(label, current);
  });

  return Array.from(groups.entries()).map(([label, items]) => ({
    label,
    items,
  }));
}

export function buildContributionCells(length = 7 * 30) {
  return Array.from({ length }, (_, index) => {
    const cycle = (index * 17) % 100;
    if (cycle > 84) return "pc3";
    if (cycle > 61) return "pc2";
    if (cycle > 32) return "pc1";
    return "pc0";
  });
}
