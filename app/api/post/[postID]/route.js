import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import Blog from "../../../../lib/models/BlogModel";

export const GET = async (request) => {
  try {
    await ConnectDB();

    // Extract postID from the request URL
    const postID = request.nextUrl.pathname.split('/').pop();

    // Fetch the blog post by postID
    const blog = await Blog.findById(postID);

    if (!blog) {
      return new NextResponse("Post not found", { status: 404 });
    }

    // Return the blog post details
    return new NextResponse(JSON.stringify(blog.toObject()), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
