import { BLOG_ITEMS_LIMIT } from "@/constants/blog";
import { getBlogPage } from "@/app/lib/posts";

export default async function getBlogs() {
  try {
    return await getBlogPage(1, BLOG_ITEMS_LIMIT);
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
