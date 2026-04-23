import BlogList from "@/components/BlogList/BlogList";
import { BLOG_ITEMS_LIMIT } from "@/constants/blog";
import { getBlogPage, type BlogListResponse } from "@/app/lib/posts";

export type IBlogResponse = BlogListResponse;

export default async function Home() {
  const blogResponse = await getBlogPage(1, BLOG_ITEMS_LIMIT);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BlogList blogListData={blogResponse} />
    </main>
  );
}
