import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogById, getBlogIds } from "@/app/lib/posts";
import { getAllBlogs } from "@/app/lib/posts";
import { toBlogospherePost, toBlogospherePosts } from "@/app/lib/blogosphere";
import CodeBlock from "@/components/blogosphere/CodeBlock";

export const dynamic = "force-dynamic";

interface IParams {
  blogId: string;
}

const BlogPage = async ({ params }: { params: IParams }) => {
  const [blogData, allPosts] = await Promise.all([getBlogById(params.blogId), getAllBlogs()]);

  if (!blogData) {
    notFound();
  }

  const post = toBlogospherePost(blogData);
  const posts = toBlogospherePosts(allPosts);
  const postIndex = posts.findIndex((item) => item.id === post.id);
  const prev = postIndex > 0 ? posts[postIndex - 1] : null;
  const next = postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const related = posts
    .filter((item) => item.id !== post.id && item.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 4);
  const outline = post.body.filter((item) => item.type === "h2");

  return (
    <div className="screen post">
      <aside className="post-rail">
        <div className="rail-title">─ OUTLINE ─</div>
        <ul className="rail-toc">
          {outline.map((section, index) => (
            <li key={`${section.text}-${index}`}>
              <span className="toc-num">§{String(index + 1).padStart(2, "0")}</span>
              {section.text}
            </li>
          ))}
        </ul>

        <div className="rail-title">─ FILE ─</div>
        <div className="rail-info">
          <div>
            <span className="rk">path</span>
            <span>posts/{post.slug}.mdx</span>
          </div>
          <div>
            <span className="rk">size</span>
            <span>{(post.readTime * 1.3).toFixed(1)} KB</span>
          </div>
          <div>
            <span className="rk">mode</span>
            <span>-rw-r--r--</span>
          </div>
          <div>
            <span className="rk">chmod</span>
            <span>644</span>
          </div>
          <div>
            <span className="rk">lang</span>
            <span>mdx</span>
          </div>
        </div>

        <div className="rail-title">─ RELATED ─</div>
        <ul className="rail-rel">
          {related.map((item) => (
            <li key={item.id}>
              <Link href={`/blog/${item.id}`}>→ {item.name}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <article className="post-main">
        <header className="post-head">
          <div className="post-crumb">
            <Link href="/" className="crumb-btn">
              ← :bd
            </Link>
            <span>~/blogosphere/posts/</span>
            <span style={{ color: "var(--yellow)" }}>{post.slug}.mdx</span>
          </div>

          <div className="post-tags-top">
            {post.tags.map((tag) => (
              <span className="pr-tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="post-title">{post.name}</h1>
          <p className="post-sub">{post.subtitle}</p>

          <div className="post-byline">
            <div className="bl-avatar">
              <pre>{`┌──┐\n│◉◉│\n│──│\n└──┘`}</pre>
            </div>
            <div className="bl-who">
              <div className="bl-name">
                neo <span className="bl-verify">[verified]</span>
              </div>
              <div className="bl-meta">
                {post.createdAt.slice(0, 10)} · {post.readTime} min · edited {post.createdAt.slice(0, 10)}
              </div>
            </div>
            <div className="bl-actions">
              <button className="bl-btn" type="button">
                :follow
              </button>
              <button className="bl-btn bl-btn-primary" type="button">
                ★ {post.claps}
              </button>
            </div>
          </div>
        </header>

        <div className="post-body">
          <div className="post-cover">
            <Image src={post.image} width={1200} height={720} alt={post.name} className="post-cover-image" />
          </div>

          {post.body.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2 className="pb-h2" key={`${block.text}-${index}`}>
                  <span className="pb-h2-mark">§</span> {block.text}
                </h2>
              );
            }

            if (block.type === "p") {
              return (
                <p className="pb-p" key={`${block.text}-${index}`}>
                  {block.text}
                </p>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote className="pb-quote" key={`${block.text}-${index}`}>
                  <span className="pb-quote-mark">▍</span>
                  <div>{block.text}</div>
                </blockquote>
              );
            }

            if (block.type === "code") {
              return <CodeBlock key={`${block.text}-${index}`} lang={block.lang} text={block.text} />;
            }

            return null;
          })}

          <div className="post-end">
            <pre>{`
      ─── EOF ───

           /\\_/\\\\
          ( o.o )
           > ^ <   thanks for reading.
            `}</pre>
          </div>
        </div>

        <div className="reactions">
          <button className="rx rx-clap" type="button">
            ★ clap ({post.claps})
          </button>
          <button className="rx" type="button">
            ↺ reshare
          </button>
          <button className="rx" type="button">
            ⚐ bookmark
          </button>
          <button className="rx" type="button">
            ↳ {post.comments} comments
          </button>
        </div>

        <nav className="post-nav">
          <div className="pn-slot">
            {prev ? (
              <Link className="pn-card" href={`/blog/${prev.id}`}>
                <div className="pn-k">◀ :bprev</div>
                <div className="pn-t">{prev.name}</div>
              </Link>
            ) : null}
          </div>
          <div className="pn-slot pn-right">
            {next ? (
              <Link className="pn-card" href={`/blog/${next.id}`}>
                <div className="pn-k">:bnext ▶</div>
                <div className="pn-t">{next.name}</div>
              </Link>
            ) : null}
          </div>
        </nav>
      </article>
    </div>
  );
};

export default BlogPage;
