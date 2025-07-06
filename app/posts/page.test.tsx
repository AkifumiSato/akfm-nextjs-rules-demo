import { step } from "@akfm/test-utils";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import PostsPage from "./page";
import type { PostsResponse } from "./types";

const mockPostsResponse: PostsResponse = {
  limit: 30,
  posts: [
    {
      body: "This is a test post body.",
      id: 1,
      reactions: {
        dislikes: 2,
        likes: 10,
      },
      tags: ["test"],
      title: "Test Post",
      userId: 1,
      views: 100,
    },
  ],
  skip: 0,
  total: 1,
};

const server = setupServer(
  http.get("https://dummyjson.com/posts", () => {
    return HttpResponse.json(mockPostsResponse);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("投稿データが正常に取得され、PostsListに渡される", async () => {
  step("Arrange: MSWでAPIレスポンスを設定", () => {
    // serverの設定はbeforeAllで完了
  });

  step("Act: PostsPageコンポーネントを実行", async () => {
    const page = await PostsPage();

    step("Assert: PostsListコンポーネントが返される", () => {
      expect(page.type).toBe("div");
      expect(page.props.className).toBe("min-h-screen bg-gray-50 py-8");
    });

    step("Assert: 投稿数が表示される", () => {
      const content = JSON.stringify(page);
      expect(content).toContain("1件の投稿があります");
    });
  });
});

test("APIエラー時にエラーが投げられる", async () => {
  step("Arrange: MSWでAPIエラーを設定", () => {
    server.use(
      http.get("https://dummyjson.com/posts", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );
  });

  step("Act & Assert: PostsPageコンポーネントがエラーを投げる", async () => {
    await expect(PostsPage()).rejects.toThrow("Failed to fetch posts: 500");
  });
});
