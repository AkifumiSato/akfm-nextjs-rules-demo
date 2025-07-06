import { fetchPostDetail } from "./fetcher";
import { PostDetailPresentation } from "./presentation";

type Props = {
  id: string;
};

export async function PostDetailContainer({ id }: Props) {
  const data = await fetchPostDetail(id);

  return <PostDetailPresentation data={data} />;
}
