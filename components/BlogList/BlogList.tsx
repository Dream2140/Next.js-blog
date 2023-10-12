"use client";

import React, { useState } from "react";
import { IBlog } from "@/types/blog";
import BlogItem from "@/components/BlogItem/BlogItem";
import { BLOG_ITEMS_LIMIT } from "@/constants/blog";
import InfiniteScroll from "react-infinite-scroller";
import { IBlogResponse } from "@/app/page";

interface BlogListProps {
  blogListData: IBlogResponse;
}

const BlogList = ({ blogListData }: BlogListProps) => {
  const [pages, setPages] = useState<IBlog[]>(blogListData.data);
  const [hasMore, setHasMore] = useState<boolean>(blogListData.hasNextPage);

  const loadMore = async (page: number) => {
    try {
      const response = await fetch(
        `/api/blog?page=${page}&limit=${BLOG_ITEMS_LIMIT}`,
      );

      if (response.ok) {
        const data = await response.json();
        setPages((prev) => [...prev, ...data.data]);
        setHasMore(data.hasNextPage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!pages || pages.length === 0) {
    return <div>There are no blog pages here yet =( </div>;
  }

  return (
    <InfiniteScroll
      hasMore={hasMore}
      pageStart={1}
      loadMore={loadMore}
      loader={
        <span key={0} className="loader">
          Loading ...
        </span>
      }
      element="main"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {pages &&
          pages.map((blogPage) => {
            return <BlogItem {...blogPage} key={blogPage.id} />;
          })}
      </div>
    </InfiniteScroll>
  );
};

export default React.memo(BlogList);
