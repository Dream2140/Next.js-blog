import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, image, text } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  }

  const blog = await prisma.blog.create({
    data: {
      name,
      image,
      text,
      userId: currentUser.id,
    },
  });

  revalidatePath("api/blog");

  return NextResponse.json(blog);
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const offset = (page - 1) * limit;

    const posts = await prisma.blog.findMany({
      skip: offset,
      take: limit,
    });

    const totalCount = await prisma.blog.count();

    const hasNextPage = offset + limit < totalCount;

    return NextResponse.json(
      {
        total: totalCount,
        page: page,
        limit,
        hasNextPage,
        data: posts,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
