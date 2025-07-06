import { describe } from "node:test";
import { step } from "@akfm/test-utils";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { FetchError } from "../../../../lib/fetch-error";
import { PostDetailContainer } from "./container";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockPost = {
  body: "This is a test post body.",
  id: 1,
  reactions: {
    dislikes: 2,
    likes: 10,
  },
  tags: ["test", "sample"],
  title: "Test Post Title",
  userId: 1,
  views: 100,
};

const mockUser = {
  email: "test@example.com",
  firstName: "Test",
  gender: "male",
  id: 1,
  image: "https://dummyjson.com/icon/test/128",
  lastName: "User",
  username: "testuser",
};

test(
  "記事詳細取得成功時、取得した情報が詳細表示コンポーネントに渡されること",
  step({
    arrange: () => {
      server.use(
        http.get("https://dummyjson.com/posts/1", () => {
          return HttpResponse.json(mockPost);
        }),
        http.get("https://dummyjson.com/users/1", () => {
          return HttpResponse.json(mockUser);
        }),
      );
    },
    act: async () => PostDetailContainer({ id: "1" }),
    assert: (result) => {
      expect(result).toHaveProperty("type");
      expect(result).toHaveProperty("props");
      expect(result.props.data).toEqual({
        post: mockPost,
        user: mockUser,
      });
    },
  }),
);

describe("記事詳細取得", () => {
  test(
    "記事取得でネットワークエラー時、エラーとなること",
    step({
      arrange: () => {
        server.use(
          http.get("https://dummyjson.com/posts/1", () => {
            return HttpResponse.error();
          }),
        );
      },
      act: async (): Promise<Error | React.JSX.Element> => {
        try {
          const result = await PostDetailContainer({ id: "1" });
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

  test(
    "ユーザー取得でネットワークエラー時、エラーとなること",
    step({
      arrange: () => {
        server.use(
          http.get("https://dummyjson.com/posts/1", () => {
            return HttpResponse.json(mockPost);
          }),
          http.get("https://dummyjson.com/users/1", () => {
            return HttpResponse.error();
          }),
        );
      },
      act: async (): Promise<Error | React.JSX.Element> => {
        try {
          const result = await PostDetailContainer({ id: "1" });
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

  test(
    "記事が存在しない場合、エラーとなること",
    step({
      arrange: () => {
        server.use(
          http.get("https://dummyjson.com/posts/999", () => {
            return new HttpResponse(null, { status: 404 });
          }),
        );
      },
      act: async (): Promise<Error | React.JSX.Element> => {
        try {
          const result = await PostDetailContainer({ id: "999" });
          return result; // not reached
        } catch (error) {
          return error;
        }
      },
      assert: (result) => {
        expect(result).toBeInstanceOf(FetchError);
        expect((result as Error).message).toContain("Failed to fetch post 999");
      },
    }),
  );
});
