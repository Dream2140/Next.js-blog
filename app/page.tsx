import BlogList from "@/components/BlogList/BlogList";
import { IBlog } from "@/types/blog";
import { BLOG_ITEMS_LIMIT } from "@/constants/blog";

export interface IBlogResponse {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  data: IBlog[];
}
async function fetchItems() {
  const response = await fetch(
    `${process.env.SITE_URL}/api/blog?page=1&limit=${BLOG_ITEMS_LIMIT}`,
    { method: "GET", cache: "force-cache" },
  );

  return await response.json();
}

export default async function Home() {
  const blogResponse = await fetchItems();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BlogList blogListData={blogResponse} />
    </main>
  );
}
