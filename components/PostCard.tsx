import Image from "next/image";
import type { Post } from "@/lib/directus";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const preview = post.content.slice(0, 140);
  const publishedText = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString()
    : "Unpublished";

  return (
    <article className="group overflow-hidden rounded-2xl border border-black/5 bg-surface-strong shadow-[0_16px_34px_-26px_rgba(21,21,21,.62)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-22px_rgba(16,39,36,.42)]">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={680}
          height={380}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          unoptimized
        />
      )}

      {!post.image && (
        <div className="flex h-52 items-end bg-gradient-to-br from-accent-soft via-[#f7f3dd] to-[#ffd7b8] p-4">
          <p className="rounded-lg bg-white/80 px-2 py-1 text-sm font-semibold text-foreground">
            {post.title}
          </p>
        </div>
      )}

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="truncate rounded-full bg-[#ecf6f4] px-3 py-1 font-semibold uppercase tracking-[0.12em] text-accent">
            {post.category}
          </span>
          <span className="text-muted">{publishedText}</span>
        </div>

        <h2 className="line-clamp-2 text-xl font-extrabold tracking-tight text-foreground">{post.title}</h2>

        <p className="text-sm leading-relaxed text-muted">{preview}...</p>
      </div>
    </article>
  );
}
