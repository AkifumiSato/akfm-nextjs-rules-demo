import { FetchError } from "../../../../lib/fetch-error";
import type { Post, PostDetailData, User } from "./types";

export async function fetchPost(id: string): Promise<Post> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new FetchError(`Failed to fetch post ${id}`, res.status);
  }

  return res.json();
}

export async function fetchUser(userId: number): Promise<User> {
  const res = await fetch(`https://dummyjson.com/users/${userId}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new FetchError(`Failed to fetch user ${userId}`, res.status);
  }

  return res.json();
}

export async function fetchPostDetail(id: string): Promise<PostDetailData> {
  // 並行データ取得
  const post = await fetchPost(id);
  const user = await fetchUser(post.userId);

  return { post, user };
}
