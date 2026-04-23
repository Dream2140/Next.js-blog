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
      className="group cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)]"
      onClick={() => router.push(`/blog/${blogItemProps.id}`)}
    >
      <Image
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        src={blogItemProps.image}
        alt={blogItemProps.name}
        className="h-52 w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
      />

      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-400">
          <span>Article</span>
          <span>Read more</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          {blogItemProps.name}
        </h2>
        <p className="leading-7 text-slate-600">
          {cutTextToLength(blogItemProps.text, BLOG_TEXT_LENGTH)}
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
