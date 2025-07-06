import { fetchPosts } from "./posts";
import { PostsList } from "./posts-presentation";

export default async function PostsPage() {
  const data = await fetchPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">投稿一覧</h1>
          <p className="text-gray-600">{data.total}件の投稿があります</p>
        </div>

        <PostsList posts={data.posts} />
      </div>
    </div>
  );
}
