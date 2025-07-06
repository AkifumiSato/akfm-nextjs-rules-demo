import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen p-10 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <ul className="list-disc pl-5">
        <li>
          <StyledLink href="/posts">Posts</StyledLink>
        </li>
      </ul>
    </div>
  );
}

function StyledLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-blue-500 underline">
      {children}
    </Link>
  );
}
