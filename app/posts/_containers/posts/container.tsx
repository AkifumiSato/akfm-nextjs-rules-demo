import { fetchPosts } from "./fetcher";
import { PostsList } from "./presentation";

export async function PostsContainer() {
  const data = await fetchPosts();

  return <PostsList posts={data.posts} total={data.total} />;
}
