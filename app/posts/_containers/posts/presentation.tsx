import type { Post } from "./types";

type PostsListProps = {
  posts: Post[];
  total: number;
};

export function PostsList({ posts, total }: PostsListProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-600">{total}件</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            👍 {post.reactions.likes}
          </span>
          <span className="flex items-center gap-1">
            👎 {post.reactions.dislikes}
          </span>
        </div>
        <span>👁️ {post.views}</span>
      </div>
    </article>
  );
}
