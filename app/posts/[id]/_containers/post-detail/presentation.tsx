import Link from "next/link";
import type { PostDetailData } from "./types";

type Props = {
  data: PostDetailData;
};

export function PostDetailPresentation({ data }: Props) {
  const { post, user } = data;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← 投稿一覧に戻る
          </Link>
          <div className="text-sm text-gray-500">
            {post.views.toLocaleString()} 回閲覧
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.body}
          </p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reactions */}
        <div className="mt-8 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600">👍</span>
            <span className="text-gray-700">{post.reactions.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600">👎</span>
            <span className="text-gray-700">{post.reactions.dislikes}</span>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">@{user.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
