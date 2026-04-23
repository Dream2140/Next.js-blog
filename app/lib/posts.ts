import prisma from "@/app/lib/prismadb";

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
    data: posts.map(toBlogDto),
  };
}

export async function getBlogById(blogId: string) {
  if (!blogId) {
    return null;
  }

  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  return blog ? toBlogDto(blog) : null;
}

export async function getBlogIds() {
  const posts = await prisma.blog.findMany({
    select: {
      id: true,
    },
  });

  return posts.map((post) => post.id);
}
