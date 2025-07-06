import { render, screen, cleanup } from "@testing-library/react";
import { step } from "@akfm/test-utils";
import { afterEach, expect, test } from "vitest";
import { PostDetailPresentation } from "./presentation";
import type { PostDetailData } from "./types";

afterEach(() => {
  cleanup();
});

const mockPostDetailData: PostDetailData = {
  post: {
    body: "This is a test post body.\nIt has multiple lines.",
    id: 1,
    reactions: {
      dislikes: 2,
      likes: 10,
    },
    tags: ["test", "sample"],
    title: "Test Post Title",
    userId: 1,
    views: 100,
  },
  user: {
    email: "test@example.com",
    firstName: "Test",
    gender: "male",
    id: 1,
    image: "https://dummyjson.com/icon/test/128",
    lastName: "User",
    username: "testuser",
  },
};

test(
  "記事詳細データが正しく表示されること",
  step({
    arrange: () => {
      render(<PostDetailPresentation data={mockPostDetailData} />);
    },
    act: () => {
      // レンダリング結果を確認
    },
    assert: () => {
      // 記事タイトルが表示されること
      expect(screen.getByText("Test Post Title")).toBeInTheDocument();
      
      // 記事本文が表示されること（改行文字で分割されて表示される）
      expect(screen.getByText(/This is a test post body/)).toBeInTheDocument();
      expect(screen.getByText(/It has multiple lines/)).toBeInTheDocument();
      
      // 閲覧数が表示されること
      expect(screen.getByText("100 回閲覧")).toBeInTheDocument();
      
      // タグが表示されること
      expect(screen.getByText("#test")).toBeInTheDocument();
      expect(screen.getByText("#sample")).toBeInTheDocument();
      
      // いいね・よくないが表示されること
      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      
      // 投稿者情報が表示されること
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("@testuser")).toBeInTheDocument();
      
      // 投稿者の画像が表示されること
      const authorImage = screen.getByAltText("Test User");
      expect(authorImage).toHaveAttribute("src", "https://dummyjson.com/icon/test/128");
      
      // 投稿一覧への戻るリンクが表示されること
      const backLink = screen.getByRole("link", { name: "← 投稿一覧に戻る" });
      expect(backLink).toHaveAttribute("href", "/posts");
    },
  }),
);

test(
  "タグが空の場合、タグセクションが表示されないこと",
  step({
    arrange: () => {
      const dataWithoutTags = {
        post: {
          ...mockPostDetailData.post,
          tags: [],
        },
        user: mockPostDetailData.user,
      };
      render(<PostDetailPresentation data={dataWithoutTags} />);
    },
    act: () => {
      // レンダリング結果を確認
    },
    assert: () => {
      // タグセクションが表示されないこと
      expect(screen.queryByText("タグ")).not.toBeInTheDocument();
    },
  }),
);

test(
  "閲覧数が千単位でフォーマットされること",
  step({
    arrange: () => {
      const dataWithManyViews = {
        ...mockPostDetailData,
        post: {
          ...mockPostDetailData.post,
          views: 1000,
        },
      };
      render(<PostDetailPresentation data={dataWithManyViews} />);
    },
    act: () => {
      // レンダリング結果を確認
    },
    assert: () => {
      // 閲覧数が千単位でフォーマットされること
      expect(screen.getByText("1,000 回閲覧")).toBeInTheDocument();
    },
  }),
);