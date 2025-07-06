import { describe } from "node:test";
import { step } from "@akfm/test-utils";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { PostsContainer } from "./container";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test(
  "記事取得成功時、取得した情報が一覧表示コンポーネントに渡されること",
  step({
    arrange: () => {
      server.use(
        http.get("https://dummyjson.com/posts", () => {
          return HttpResponse.json({
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
          });
        }),
      );
    },
    act: async () => PostsContainer(),
    assert: (result) => {
      expect(result).toHaveProperty("type");
      expect(result).toHaveProperty("props");
      expect(result.props).toEqual({
        posts: [
          expect.objectContaining({
            body: "This is a test post body.",
            id: 1,
            reactions: {
              dislikes: 2,
              likes: 10,
            },
          }),
        ],
        total: 1,
      });
    },
  }),
);

describe("記事取得", () => {
  test(
    "ネットワークエラー時、エラーとなること",
    step({
      arrange: () => {
        server.use(
          http.get("https://dummyjson.com/posts", () => {
            return HttpResponse.error();
          }),
        );
      },
      act: async (): Promise<Error | React.JSX.Element> => {
        try {
          const result = await PostsContainer();
          return result; // not reached
        } catch (error) {
          return error;
        }
      },
      assert: (result) => {
        expect(result).toBeInstanceOf(Error);
        expect((result as Error).message).toContain("Failed to fetch");
      },
    }),
  );
});
