import Link from "next/link";
import { buildContributionCells, BlogospherePost } from "@/app/lib/blogosphere";
import { IUser } from "@/types/user";

interface ProfileScreenProps {
  posts: BlogospherePost[];
  currentUser: IUser | null;
}

export default function ProfileScreen({ posts, currentUser }: ProfileScreenProps) {
  const profile = {
    handle: currentUser?.name?.toLowerCase().replace(/\s+/g, "") || "neo",
    name: currentUser?.name || "Neo",
    title: "Staff engineer · React infra · Writes from the terminal",
    location: "ZION-07, 127.0.0.1",
    joined: currentUser?.createdAt?.slice(0, 10) || "2019-06-03",
    bio:
      "I build the parts of React apps you do not see: build pipelines, route architecture, auth flows, and the glue between server and client. This screen is UI-first for now, but the visual design matches the supplied mockup.",
    stats: {
      posts: posts.length,
      followers: 8140,
      following: 127,
    },
    links: [
      { k: "git", v: "github.com/glebantonenko" },
      { k: "mast", v: "@gleb@hachyderm.io" },
      { k: "rss", v: "/feed.xml" },
      { k: "mail", v: currentUser?.email || "neo@blogosphere.dev" },
    ],
    now: [
      "Refactoring this blog toward a real production baseline.",
      "Porting the exact terminal chrome from the Blogosphere design.",
      "Keeping unsupported product features as UI-only until the backend catches up.",
    ],
  };

  const contributionCells = buildContributionCells();

  return (
    <div className="screen profile">
      <div className="pf-grid">
        <aside className="pf-card">
          <pre className="pf-ascii">{`     ╔══════════════╗
     ║  ▄▄▄▄▄▄▄▄▄▄  ║
     ║  █ ◉    ◉ █  ║
     ║  █   --   █  ║
     ║  █ ╲____╱ █  ║
     ║  ▀▀▀▀▀▀▀▀▀▀  ║
     ╚══════════════╝
     [ AUTH: OK  ]`}</pre>
          <h1 className="pf-handle">@{profile.handle}</h1>
          <div className="pf-name">{profile.name}</div>
          <div className="pf-title">{profile.title}</div>

          <div className="pf-stats">
            <div>
              <b>{profile.stats.posts}</b>
              <span>posts</span>
            </div>
            <div>
              <b>{profile.stats.followers.toLocaleString()}</b>
              <span>followers</span>
            </div>
            <div>
              <b>{profile.stats.following}</b>
              <span>following</span>
            </div>
          </div>

          <div className="pf-actions">
            <button className="pa-btn pa-primary" type="button">
              :follow
            </button>
            <button className="pa-btn" type="button">
              :msg
            </button>
          </div>

          <div className="pf-block">
            <div className="pf-label">─ /etc/passwd ─</div>
            {profile.links.map((link) => (
              <div key={link.k} className="pf-link">
                <span className="pl-k">{link.k}</span>
                <span className="pl-v">{link.v}</span>
              </div>
            ))}
          </div>
          <div className="pf-block">
            <div className="pf-label">─ whereis ─</div>
            <div className="pf-link">
              <span className="pl-k">loc</span>
              <span className="pl-v">{profile.location}</span>
            </div>
            <div className="pf-link">
              <span className="pl-k">since</span>
              <span className="pl-v">{profile.joined}</span>
            </div>
          </div>
        </aside>

        <section className="pf-content">
          <div className="pf-bio">
            <div className="pf-label">─ cat ./README.md ─</div>
            <p>{profile.bio}</p>
          </div>

          <div className="pf-now">
            <div className="pf-label">─ ./now ─</div>
            {profile.now.map((item, index) => (
              <div className="pf-now-line" key={item}>
                <span className="pnl-k">[{String(index + 1).padStart(2, "0")}]</span> {item}
              </div>
            ))}
          </div>

          <div className="pf-contrib">
            <div className="pf-label">─ git log --graph ─</div>
            <div className="pc-grid">
              {contributionCells.map((className, index) => (
                <div className={`pc-cell ${className}`} key={`${className}-${index}`} />
              ))}
            </div>
            <div className="pc-legend">
              <span>less</span>
              <span className="pc-cell pc0" />
              <span className="pc-cell pc1" />
              <span className="pc-cell pc2" />
              <span className="pc-cell pc3" />
              <span>more</span>
            </div>
          </div>

          <div className="pf-posts">
            <div className="pf-label">─ ls -la posts/ ─</div>
            <div className="pp-list">
              {posts.slice(0, 6).map((post) => (
                <Link className="pp-row" href={`/blog/${post.id}`} key={post.id}>
                  <span className="pp-perm">-rw-r--r--</span>
                  <span className="pp-size">{(post.readTime * 1.3).toFixed(1)}K</span>
                  <span className="pp-date">{post.createdAt.slice(0, 10)}</span>
                  <span className="pp-name">{post.slug}.mdx</span>
                  <span className="pp-claps">★{post.claps}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
