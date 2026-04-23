import getCurrentUser from "@/app/actions/getCurrentUser";
import { getAllBlogs } from "@/app/lib/posts";
import { toBlogospherePosts } from "@/app/lib/blogosphere";
import ProfileScreen from "@/components/blogosphere/ProfileScreen";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const [currentUser, posts] = await Promise.all([
    getCurrentUser(),
    getAllBlogs(),
  ]);

  return <ProfileScreen currentUser={currentUser} posts={toBlogospherePosts(posts)} />;
}
