import { getAllBlogs } from "@/app/lib/posts";
import { toBlogospherePosts } from "@/app/lib/blogosphere";
import ArchiveScreen from "@/components/blogosphere/ArchiveScreen";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const posts = toBlogospherePosts(await getAllBlogs());

  return <ArchiveScreen posts={posts} />;
}
