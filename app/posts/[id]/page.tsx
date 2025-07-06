import { PostDetailContainer } from "./_containers/post-detail";

type Props = {
  params: { id: string };
};

export default async function PostDetailPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PostDetailContainer id={params.id} />
      </div>
    </div>
  );
}
