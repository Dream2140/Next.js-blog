import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  blogId?: string;
}
export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { blogId } = params;

    const blogData = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    return NextResponse.json({ ...blogData }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
