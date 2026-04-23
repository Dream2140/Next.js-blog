"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BlogospherePost } from "@/app/lib/blogosphere";
import Typewriter from "@/components/blogosphere/Typewriter";
import Tag from "@/components/blogosphere/Tag";

interface FeedScreenProps {
  posts: BlogospherePost[];
}

export default function FeedScreen({ posts }: FeedScreenProps) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<"recent" | "popular">("recent");

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts],
  );

  const filtered = useMemo(() => {
    let next = posts.slice();

    if (query) {
      const normalized = query.toLowerCase();
      next = next.filter((post) =>
        `${post.name} ${post.subtitle} ${post.excerpt} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(normalized),
      );
    }

    if (activeTags.length > 0) {
      next = next.filter((post) => activeTags.every((tag) => post.tags.includes(tag)));
    }

    if (sort === "popular") {
      next.sort((a, b) => b.claps - a.claps);
    } else {
      next.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    return next;
  }, [activeTags, posts, query, sort]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const toggleTag = (tag: string) => {
    setActiveTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  };

  return (
    <div className="screen feed">
      <section className="feed-hero">
        <pre className="hero-ascii" aria-hidden>
          {` ██████╗ ██╗     ███████╗██████╗ 
██╔════╝ ██║     ██╔════╝██╔══██╗
██║  ███╗██║     █████╗  ██████╔╝
██║   ██║██║     ██╔══╝  ██╔══██╗
╚██████╔╝███████╗███████╗██████╔╝
 ╚═════╝ ╚══════╝╚══════╝╚═════╝ 
 █████╗ ███╗   ██╗████████╗ ██████╗ ███╗   ██╗███████╗███╗   ██╗██╗  ██╗ ██████╗ 
██╔══██╗████╗  ██║╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝████╗  ██║██║ ██╔╝██╔═══██╗
███████║██╔██╗ ██║   ██║   ██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║█████╔╝ ██║   ██║
██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║██╔═██╗ ██║   ██║
██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚████║███████╗██║ ╚████║██║  ██╗╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ 
>_ wake up, neo... the terminal has you.`}
        </pre>

        <div className="hero-meta">
          <div className="hm-row">
            <span className="hm-k">$</span>
            <span className="hm-v">
              <Typewriter text="whoami && cat ./manifest.md" speed={28} />
            </span>
          </div>
          <div className="hm-row dim">
            <span className="hm-v">
              {posts.length} posts · {posts.reduce((sum, post) => sum + post.claps, 0).toLocaleString()}{" "}
              claps · updated <span style={{ color: "var(--aqua)" }}>just now</span> · license{" "}
              <span style={{ color: "var(--yellow)" }}>CC-BY-4.0</span>
            </span>
          </div>
        </div>

        <div className="cmdbar">
          <span className="cmdbar-mode">/</span>
          <input
            className="cmdbar-input"
            placeholder="search posts…    (or type a #tag)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="cmdbar-split">
            <button
              className={`cb-sort ${sort === "recent" ? "is-on" : ""}`}
              onClick={() => setSort("recent")}
              type="button"
            >
              :sort recent
            </button>
            <button
              className={`cb-sort ${sort === "popular" ? "is-on" : ""}`}
              onClick={() => setSort("popular")}
              type="button"
            >
              :sort popular
            </button>
          </div>
        </div>

        <div className="tag-rail">
          <span className="tr-label">tags ▸</span>
          {allTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={activeTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
          {activeTags.length > 0 ? (
            <button className="tr-clear" onClick={() => setActiveTags([])} type="button">
              :clear
            </button>
          ) : null}
        </div>
      </section>

      <section className="feed-list">
        <div className="fl-header">
          <span>─── {filtered.length} posts ───</span>
          <span className="fl-hint">↵ open · j/k next/prev · / search</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <pre>{`  (╯°□°)╯︵ ┻━┻\n\n  no matches. try :clear`}</pre>
          </div>
        ) : (
          <>
            {featured ? (
              <Link className="pr pr-featured" href={`/blog/${featured.id}`}>
                <div className="pr-badge">[FEATURED]</div>
                <div className="pr-f-grid">
                  <div className="pr-f-num">
                    <pre>{`┌─────────┐\n│  #${String(featured.id).padStart(3, "0")}  │\n│  ${featured.tags[0]
                      .slice(0, 5)
                      .padEnd(5)}  │\n└─────────┘`}</pre>
                  </div>
                  <div className="pr-f-body">
                    <h2 className="pr-f-title">{featured.name}</h2>
                    <p className="pr-f-sub">{featured.subtitle}</p>
                    <p className="pr-f-excerpt">{featured.excerpt}</p>
                    <div className="pr-meta">
                      <span>{featured.createdAt.slice(0, 10)}</span>
                      <span>·</span>
                      <span>{featured.readTime} min read</span>
                      <span>·</span>
                      <span style={{ color: "var(--yellow)" }}>★ {featured.claps}</span>
                      <span>·</span>
                      <span style={{ color: "var(--aqua)" }}>{featured.comments} comments</span>
                    </div>
                    <div className="pr-tags">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="pr-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ) : null}

            {rest.map((post, index) => (
              <Link className="pr" href={`/blog/${post.id}`} key={post.id}>
                <div className="pr-gutter">{String(index + 1).padStart(2, "0")}</div>
                <div className="pr-main">
                  <div className="pr-line-1">
                    <span className="pr-date">{post.createdAt.slice(0, 10)}</span>
                    <span className="pr-sep">│</span>
                    <h3 className="pr-title">{post.name}</h3>
                  </div>
                  <div className="pr-line-2">{post.excerpt}</div>
                  <div className="pr-line-3">
                    <span className="pr-rt">{post.readTime}m</span>
                    {post.tags.map((tag) => (
                      <span className="pr-tag" key={tag}>
                        #{tag}
                      </span>
                    ))}
                    <span className="pr-grow" />
                    <span className="pr-stat">★{post.claps}</span>
                    <span className="pr-stat">↳{post.comments}</span>
                    <span className="pr-arrow">▸</span>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </section>
    </div>
  );
}
