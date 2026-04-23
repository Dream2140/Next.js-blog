import { NextResponse } from "next/server";
import { getBlogById } from "@/app/lib/posts";

interface IParams {
  blogId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { blogId } = params;

    if (!blogId) {
      return NextResponse.json({ error: "Blog id is required" }, { status: 400 });
    }

    const blogData = await getBlogById(blogId);
    if (!blogData) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blogData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
