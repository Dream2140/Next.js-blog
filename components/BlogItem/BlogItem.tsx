"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { cutTextToLength } from "@/helpers/cutText";

interface BlogItemProps {
  name: string;
  image: string;
  text: string;
  id: string;
}

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 300;

const BLOG_TEXT_LENGTH = 100;

const BlogItem = (blogItemProps: BlogItemProps) => {
  const router = useRouter();
  return (
    <div
      className=" transition-transform bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl hover:scale-[1.01]"
      onClick={() => router.push(`/blog/${blogItemProps.id}`)}
    >
      <Image
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        src={blogItemProps.image}
        alt={blogItemProps.name}
        className="w-full h-40 object-cover object-center"
      />

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{blogItemProps.name}</h2>
        <p className="text-gray-700">
          {cutTextToLength(blogItemProps.text, BLOG_TEXT_LENGTH)}
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
