export const getPosts = async () => {
    const res = await fetch(
        "http://localhost:8055/items/posts?fields=*,category.*,image.*",
        { cache: "no-store" }
    );

    const json = await res.json();

    return json.data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category?.name || "No Category",
        image: post.image
            ? `http://localhost:8055/assets/${post.image}`
            : null,
        publishedAt: post.published_at,
    }));
};