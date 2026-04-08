import { getPosts } from "@/lib/directus";
import PostCard from "@/components/PostCard";

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className="page-shell grain-overlay px-4 py-8 sm:px-6 lg:px-10">
      <div>
        <h1 className="rise-fade text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Velocity Paddock Journal
        </h1>
        <p className="rise-fade mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          Engineering notes, launch stories, and trackside updates from the
          latest Formula projects.
        </p>
      </div>
      {posts.length === 0 ? (
        <section className="mx-auto mt-8 max-w-7xl rounded-2xl border border-dashed border-accent/30 bg-surface p-10 text-center">
          <h2 className="text-2xl font-bold">No posts available yet</h2>
          <p className="mt-2 text-muted">
            Create a post in Directus and it will appear here automatically.
          </p>
        </section>
      ) : (
        <section className="mx-auto mt-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="rise-fade"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
