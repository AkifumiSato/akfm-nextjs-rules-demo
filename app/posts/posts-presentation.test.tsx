import { step } from "@akfm/test-utils";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PostsList } from "./posts-presentation";
import type { Post } from "./types";

const mockPosts: Post[] = [
  {
    body: "This is a test post body with some content.",
    id: 1,
    reactions: {
      dislikes: 2,
      likes: 10,
    },
    tags: ["test", "demo"],
    title: "Test Post Title",
    userId: 1,
    views: 100,
  },
  {
    body: "This is another test post with different content.",
    id: 2,
    reactions: {
      dislikes: 1,
      likes: 5,
    },
    tags: ["example", "sample"],
    title: "Another Test Post",
    userId: 2,
    views: 50,
  },
];

test("投稿一覧が正しく表示される", () => {
  step("Arrange: 投稿データを準備", () => {
    // mockPostsを使用
  });

  step("Act: PostsListコンポーネントをレンダリング", () => {
    render(<PostsList posts={mockPosts} />);
  });

  step("Assert: 投稿のタイトルが表示される", () => {
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("Another Test Post")).toBeInTheDocument();
  });

  step("Assert: 投稿の本文が表示される", () => {
    expect(
      screen.getByText("This is a test post body with some content."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is another test post with different content."),
    ).toBeInTheDocument();
  });

  step("Assert: タグが表示される", () => {
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("demo")).toBeInTheDocument();
    expect(screen.getByText("example")).toBeInTheDocument();
    expect(screen.getByText("sample")).toBeInTheDocument();
  });

  step("Assert: リアクション数が表示される", () => {
    expect(screen.getByText("👍 10")).toBeInTheDocument();
    expect(screen.getByText("👎 2")).toBeInTheDocument();
    expect(screen.getByText("👍 5")).toBeInTheDocument();
    expect(screen.getByText("👎 1")).toBeInTheDocument();
  });

  step("Assert: 閲覧数が表示される", () => {
    expect(screen.getByText("👁️ 100")).toBeInTheDocument();
    expect(screen.getByText("👁️ 50")).toBeInTheDocument();
  });
});

test("投稿が0件の場合、何も表示されない", () => {
  step("Arrange: 空の投稿配列を準備", () => {
    // 空配列を使用
  });

  step("Act: PostsListコンポーネントをレンダリング", () => {
    render(<PostsList posts={[]} />);
  });

  step("Assert: 投稿カードが表示されない", () => {
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
