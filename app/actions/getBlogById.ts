import { getBlogById } from "@/app/lib/posts";

interface IParams {
  blogId: string;
}

export default async function getBlogsById(params: IParams) {
  try {
    const { blogId } = params;

    const listing = await getBlogById(blogId);

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
