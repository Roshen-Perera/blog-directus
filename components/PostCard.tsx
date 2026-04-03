import Image from "next/image";

export default function PostCard({ post }: any) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>

        <p className="text-gray-600 mb-3">{post.content?.slice(0, 100)}...</p>

        <p className="text-sm text-gray-500">Category: {post.category}</p>

        <p className="text-sm text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
