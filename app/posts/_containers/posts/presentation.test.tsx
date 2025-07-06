import { step } from "@akfm/test-utils";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PostsList } from "./presentation";

describe("記事が1件", () => {
  test(
    "件数と記事の情報が表示されること",
    step({
      act: () =>
        render(
          <PostsList
            posts={[
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
            ]}
            total={1}
          />,
        ),
      assert: () => {
        expect(screen.getByText("1件")).toBeInTheDocument();
        expect(screen.getByText("Test Post Title")).toBeInTheDocument();
        expect(screen.getByText("demo")).toBeInTheDocument();
        expect(screen.getByText("👁️ 100")).toBeInTheDocument();
        expect(screen.getByText("👍 10")).toBeInTheDocument();
        expect(screen.getByText("👎 2")).toBeInTheDocument();
      },
    }),
  );
});

describe("記事が0件", () => {
  test(
    "件数が表示されること",
    step({
      act: () => render(<PostsList posts={[]} total={0} />),
      assert: () => {
        expect(screen.getByText("0件")).toBeInTheDocument();
      },
    }),
  );
});
