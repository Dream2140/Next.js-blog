import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { revalidatePath } from "next/cache";
import {
  getBlogPage,
  normalizePagination,
  validatePostPayload,
} from "@/app/lib/posts";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, text } = body;

    const validationError = validatePostPayload({ name, image, text });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Not allowed" }, { status: 401 });
    }

    const blog = await prisma.blog.create({
      data: {
        name: name.trim(),
        image: image.trim(),
        text: text.trim(),
        userId: currentUser.id,
      },
    });

    revalidatePath("/");
    revalidatePath(`/blog/${blog.id}`);

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const { page, limit } = normalizePagination(
      parseInt(url.searchParams.get("page") || "1", 10),
      parseInt(url.searchParams.get("limit") || "10", 10),
    );

    const response = await getBlogPage(page, limit);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
