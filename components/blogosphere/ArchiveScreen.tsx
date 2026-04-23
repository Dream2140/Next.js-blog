import Link from "next/link";
import { BlogospherePost, groupPostsByMonth } from "@/app/lib/blogosphere";

interface ArchiveScreenProps {
  posts: BlogospherePost[];
}

export default function ArchiveScreen({ posts }: ArchiveScreenProps) {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const groups = groupPostsByMonth(posts);

  return (
    <div className="screen archive">
      <section className="ar-head">
        <pre className="ar-ascii">{`   _              _     _           
  / \\   _ __ ___| |__ (_)_   _____ 
 / _ \\ | '__/ __| '_ \\| \\ \\ / / _ \\
/ ___ \\| | | (__| | | | |\\ V /  __/
/_/   \\_\\_|  \\___|_| |_|_| \\_/ \\___|`}</pre>
        <h1 className="ar-title">Archive</h1>
        <p className="ar-sub">Everything indexed by month, tag, and terminal mood.</p>
      </section>

      <section className="ar-cloud">
        <div className="pf-label">─ grep -R &quot;#tag&quot; ./posts ─</div>
        <div className="ac-cloud">
          {tags.map((tag, index) => (
            <button
              className={`ac-tag ${index === 0 ? "is-on" : ""}`}
              key={tag}
              style={{ fontSize: `${14 + (index % 5) * 3}px` }}
              type="button"
            >
              #{tag}
              <span className="ac-count">{posts.filter((post) => post.tags.includes(tag)).length}</span>
            </button>
          ))}
        </div>
      </section>

      {groups.map((group) => (
        <section className="ar-month" key={group.label}>
          <div className="am-head">
            <span className="am-bullet">◆</span>
            <span className="am-label">{group.label}</span>
            <span className="am-rule">────────────────────────────────────────</span>
            <span className="am-count">{group.items.length} posts</span>
          </div>
          <div className="am-posts">
            {group.items.map((post) => (
              <Link className="am-post" href={`/blog/${post.id}`} key={post.id}>
                <span className="amp-date">{post.createdAt.slice(8, 10)}</span>
                <span className="amp-title">{post.name}</span>
                <span className="amp-grow" />
                <span className="amp-stat">★{post.claps}</span>
                <span className="amp-arrow">▸</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
