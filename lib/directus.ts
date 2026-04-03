export const getPosts = async () => {
    const res = await fetch(
        "http://localhost:8055/items/posts?fields=*,category.*,image.*",
        { cache: "no-store" }
    );

    if (!res.ok) {
        console.error("Failed to fetch posts from Directus", res.status, res.statusText);
        return [];
    }

    const json = await res.json();
    const items = Array.isArray(json?.data) ? json.data : [];

    return items.map((post: any) => ({
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