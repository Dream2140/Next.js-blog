import { getAllBlogs } from "@/app/lib/posts";
import { toBlogospherePosts } from "@/app/lib/blogosphere";
import FeedScreen from "@/components/blogosphere/FeedScreen";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = toBlogospherePosts(await getAllBlogs());

  return <FeedScreen posts={posts} />;
}
