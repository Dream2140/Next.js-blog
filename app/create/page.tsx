"use client";

import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface BlogStateProps {
  name: string;
  image: string;
  text: string;
}

const blogDataInitialState: BlogStateProps = {
  name: "",
  image: "",
  text: "",
};

const Create = () => {
  const router = useRouter();
  const [blogData, setBlogData] =
    useState<BlogStateProps>(blogDataInitialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setBlogData({ ...blogData, [event.target.name]: event.target.value });
  }

  const lines = useMemo(() => blogData.text.split("\n"), [blogData.text]);
  const wordCount = useMemo(
    () => blogData.text.split(/\s+/).filter(Boolean).length,
    [blogData.text],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!blogData.name || !blogData.text || !blogData.image) {
      setError("All fields are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Could not create the post");
        return;
      }

      setBlogData(blogDataInitialState);
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error(e);
      setError("Unexpected error while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="screen editor" onSubmit={handleSubmit}>
      <aside className="ed-tree">
        <div className="et-title">:Explore</div>
        <ul className="et-list">
          <li className="et-dir">▾ posts/</li>
          <li className="et-file is-active">
            ● untitled.mdx <span className="et-dirty">[+]</span>
          </li>
          <li className="et-file">react-19-use-hook.mdx</li>
          <li className="et-file">killing-barrel-files.mdx</li>
          <li className="et-dir">▾ drafts/</li>
          <li className="et-file">terminal-ui-rewrite.mdx</li>
          <li className="et-dir">▸ assets/</li>
          <li className="et-file">README.md</li>
        </ul>
        <div className="et-title">:Tags</div>
        <div className="et-tags">
          {["react", "typescript", "rsc", "perf", "css"].map((tag) => (
            <span className="pr-tag" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      </aside>

      <section className="ed-main">
        <div className="ed-titlebar">
          <span className="etb-buf">[Buffer 1]</span>
          <input
            className="etb-title"
            name="name"
            onChange={handleChange}
            placeholder="Untitled Post"
            value={blogData.name}
          />
          <span className="etb-dirty">[modified]</span>
        </div>

        <div className="ed-frontmatter">
          <div>
            <span className="fm-k">---</span>
          </div>
          <div>
            <span className="fm-k">title:</span> <span className="fm-v">{blogData.name || "Untitled Post"}</span>
          </div>
          <div>
            <span className="fm-k">date:</span> <span className="fm-v">2026-04-23</span>
          </div>
          <div>
            <span className="fm-k">cover:</span> <span className="fm-v">{blogData.image || "https://..."}</span>
          </div>
          <div>
            <span className="fm-k">draft:</span> <span className="fm-v">false</span>
          </div>
          <div>
            <span className="fm-k">---</span>
          </div>
        </div>

        {error ? <div className="editor-error">{error}</div> : null}

        <textarea
          className="ed-textarea"
          id="text"
          name="text"
          onChange={handleChange}
          placeholder="Write the body of your post here..."
          spellCheck={false}
          value={blogData.text}
        />

        <div className="ed-gutter">
          {lines.map((_, index) => (
            <div className="eg-line" key={index}>
              {String(index + 1).padStart(3, " ")}
            </div>
          ))}
        </div>
      </section>

      <aside className="ed-preview">
        <div className="ep-title">─ :Preview ─</div>
        <div className="ep-body">
          <h2 className="ep-h">{blogData.name || "Untitled Post"}</h2>
          <p className="ep-p">
            {blogData.text || "This is a UI-only preview for now. Publishing still uses the real API route."}
          </p>
          <h3 className="ep-h3">Cover image</h3>
          <p className="ep-p">
            <code>{blogData.image || "https://example.com/cover.jpg"}</code>
          </p>
        </div>

        <div className="ep-stats">
          <div>
            <span className="rk">words</span>
            <span>{wordCount}</span>
          </div>
          <div>
            <span className="rk">chars</span>
            <span>{blogData.text.length}</span>
          </div>
          <div>
            <span className="rk">read</span>
            <span>{Math.max(1, Math.round(wordCount / 220))} min</span>
          </div>
          <div>
            <span className="rk">lines</span>
            <span>{lines.length}</span>
          </div>
        </div>

        <div className="ep-actions">
          <button className="ea-btn" type="button">
            :w save
          </button>
          <button className="ea-btn ea-pub" disabled={isSubmitting} type="submit">
            {isSubmitting ? ":publishing" : ":publish"}
          </button>
        </div>
      </aside>
    </form>
  );
};

export default Create;
