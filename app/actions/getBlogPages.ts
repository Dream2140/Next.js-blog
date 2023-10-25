import prisma from "../lib/prismadb";
import { IBlog } from "@/types/blog";

export default async function getBlogs(): Promise<IBlog[]> {
  try {
    return await prisma.blog.findMany();
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
