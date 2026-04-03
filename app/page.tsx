import { getPosts } from "@/lib/directus";
import PostCard from "@/components/PostCard";

export default async function Page() {
  const posts = await getPosts();
  const publishedCount = posts.filter((post) => post.publishedAt).length;

  return (
    <main className="page-shell grain-overlay px-4 py-8 sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl rounded-3xl border border-black/5 bg-surface-strong/80 p-6 shadow-[0_20px_70px_-30px_rgba(20,20,20,.35)] backdrop-blur md:p-10">
        <p className="rise-fade inline-flex items-center rounded-full border border-accent/20 bg-accent-soft/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Live from Directus
        </p>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="rise-fade text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Velocity Paddock Journal
            </h1>
            <p className="rise-fade mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Engineering notes, launch stories, and trackside updates from the
              latest Formula projects.
            </p>
          </div>

          <div className="rise-fade grid grid-cols-2 gap-3 text-sm sm:w-72">
            <div className="rounded-2xl border border-black/5 bg-surface px-4 py-3">
              <p className="text-muted">Posts</p>
              <p className="text-2xl font-extrabold">{posts.length}</p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-surface px-4 py-3">
              <p className="text-muted">Published</p>
              <p className="text-2xl font-extrabold">{publishedCount}</p>
            </div>
          </div>
        </div>
      </section>

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
