import prisma from "../lib/prismadb";

interface IParams {
  blogId: string;
}

export default async function getBlogsById(params: IParams) {
  try {
    const { blogId } = params;

    const listing = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
