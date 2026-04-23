import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogById, getBlogIds } from "@/app/lib/posts";

interface IParams {
  blogId: string;
}

const BlogPage = async ({ params }: { params: IParams }) => {
  const blogData = await getBlogById(params.blogId);

  if (!blogData) {
    notFound();
  }

  return (
    <div className="w-[1200px] mx-auto py-16 px-12 flex flex-col gap-4 flex justify-center">
      <div className="border-b-2">
        <h1 className="text-[25px]"> {blogData?.name}</h1>
      </div>
      <div className="flex justify-center">
        <Image
          src={blogData?.image}
          width={500}
          height={400}
          alt={blogData?.name}
        />
      </div>
      <div>
        <span>{blogData?.text}</span>
      </div>
    </div>
  );
};

export default BlogPage;

export async function generateStaticParams() {
  const blogIds = await getBlogIds();

  return blogIds.map((blogId) => ({
    blogId,
  }));
}
