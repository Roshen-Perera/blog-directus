import Image from "next/image";
import type { Post } from "@/lib/directus";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const preview = post.content.slice(0, 100);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
          unoptimized
        />
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>

        <p className="text-gray-600 mb-3">{preview}...</p>

        <p className="text-sm text-gray-500">Category: {post.category}</p>
      </div>
    </div>
  );
}
