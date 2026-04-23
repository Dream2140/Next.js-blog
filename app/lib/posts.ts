import prisma from "@/app/lib/prismadb";
import { MOCK_POSTS } from "@/app/lib/mockPosts";

export interface BlogListResponse {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  data: BlogDto[];
}

export interface BlogDto {
  id: string;
  name: string;
  createdAt: string;
  image: string;
  text: string;
  userId: string;
  likedIds: string[];
}

export interface PostPayload {
  name: string;
  image: string;
  text: string;
}

const DEFAULT_PAGE = 1;
const MAX_LIMIT = 50;

function getFallbackPosts() {
  return MOCK_POSTS;
}

function paginateFallback(page: number, limit: number): BlogListResponse {
  const pagination = normalizePagination(page, limit);
  const posts = getFallbackPosts();
  const data = posts.slice(pagination.offset, pagination.offset + pagination.limit);

  return {
    total: posts.length,
    page: pagination.page,
    limit: pagination.limit,
    hasNextPage: pagination.offset + pagination.limit < posts.length,
    data,
  };
}

function toBlogDto(blog: {
  id: string;
  name: string;
  createdAt: Date;
  image: string;
  text: string;
  userId: string;
  likedIds: string[];
}): BlogDto {
  return {
    ...blog,
    createdAt: blog.createdAt.toISOString(),
  };
}

export function normalizePagination(page: number, limit: number) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : DEFAULT_PAGE;
  const safeLimit =
    Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), MAX_LIMIT) : 10;

  return {
    page: safePage,
    limit: safeLimit,
    offset: (safePage - 1) * safeLimit,
  };
}

export function validatePostPayload(payload: Partial<PostPayload>) {
  const name = payload.name?.trim();
  const image = payload.image?.trim();
  const text = payload.text?.trim();

  if (!name || name.length < 3) {
    return "Post title must be at least 3 characters long";
  }

  if (!text || text.length < 20) {
    return "Post text must be at least 20 characters long";
  }

  if (!image) {
    return "Post image is required";
  }

  try {
    const imageUrl = new URL(image);
    if (!["http:", "https:"].includes(imageUrl.protocol)) {
      return "Post image must use http or https";
    }
  } catch {
    return "Post image must be a valid URL";
  }

  return null;
}

export async function getBlogPage(page: number, limit: number): Promise<BlogListResponse> {
  const pagination = normalizePagination(page, limit);

  try {
    const [posts, totalCount] = await Promise.all([
      prisma.blog.findMany({
        skip: pagination.offset,
        take: pagination.limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.blog.count(),
    ]);

    return {
      total: totalCount,
      page: pagination.page,
      limit: pagination.limit,
      hasNextPage: pagination.offset + pagination.limit < totalCount,
      data: totalCount > 0 ? posts.map(toBlogDto) : paginateFallback(page, limit).data,
    };
  } catch (error) {
    console.error("getBlogPage failed", error);
    return paginateFallback(page, limit);
  }
}

export async function getAllBlogs() {
  try {
    const posts = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const normalizedPosts = posts.map(toBlogDto);
    return normalizedPosts.length > 0 ? normalizedPosts : getFallbackPosts();
  } catch (error) {
    console.error("getAllBlogs failed", error);
    return getFallbackPosts();
  }
}

export async function getBlogById(blogId: string) {
  if (!blogId) {
    return null;
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    return blog ? toBlogDto(blog) : getFallbackPosts().find((post) => post.id === blogId) || null;
  } catch (error) {
    console.error("getBlogById failed", error);
    return getFallbackPosts().find((post) => post.id === blogId) || null;
  }
}

export async function getBlogIds() {
  try {
    const posts = await prisma.blog.findMany({
      select: {
        id: true,
      },
    });

    const ids = posts.map((post) => post.id);
    return ids.length > 0 ? ids : getFallbackPosts().map((post) => post.id);
  } catch (error) {
    console.error("getBlogIds failed", error);
    return getFallbackPosts().map((post) => post.id);
  }
}
