import type { PostsResponse } from "./types";

export async function fetchPosts(): Promise<PostsResponse> {
  const res = await fetch("https://dummyjson.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  return res.json();
}
