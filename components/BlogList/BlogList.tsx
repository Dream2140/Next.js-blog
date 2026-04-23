"use client";

import React, { useState, useTransition } from "react";
import { IBlog } from "@/types/blog";
import BlogItem from "@/components/BlogItem/BlogItem";
import { BLOG_ITEMS_LIMIT } from "@/constants/blog";
import { Button } from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import { BlogListResponse } from "@/app/lib/posts";

interface BlogListProps {
  blogListData: BlogListResponse;
}

const BlogList = ({ blogListData }: BlogListProps) => {
  const [pages, setPages] = useState<IBlog[]>(blogListData.data);
  const [hasMore, setHasMore] = useState<boolean>(blogListData.hasNextPage);
  const [currentPage, setCurrentPage] = useState(blogListData.page);
  const [loadError, setLoadError] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    const nextPage = currentPage + 1;

    startTransition(async () => {
      setLoadError("");

      try {
        const response = await fetch(`/api/blog?page=${nextPage}&limit=${BLOG_ITEMS_LIMIT}`);

        if (!response.ok) {
          const data = await response.json();
          setLoadError(data.error || "Could not load more posts");
          return;
        }

        const data = await response.json();
        setPages((prev) => [...prev, ...data.data]);
        setHasMore(data.hasNextPage);
        setCurrentPage(nextPage);
      } catch (error) {
        console.error(error);
        setLoadError("Could not load more posts");
      }
    });
  };

  if (!pages || pages.length === 0) {
    return (
      <section className="surface-panel mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          No posts yet
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The blog is empty right now. Sign in and publish the first article to get things
          started.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((blogPage) => {
          return <BlogItem {...blogPage} key={blogPage.id} />;
        })}
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </div>
      ) : null}

      {hasMore ? (
        <div className="flex justify-center">
          <Button onClick={loadMore} disabled={isPending}>
            {isPending ? <Spinner /> : "Load more posts"}
          </Button>
        </div>
      ) : (
        <p className="text-center text-sm text-slate-500">
          You&apos;ve reached the end of the list.
        </p>
      )}
    </section>
  );
};

export default React.memo(BlogList);
