type DirectusPostRecord = {
    id: number | string;
    title?: string | null;
    Title?: string | null;
    content?: string | null;
    category?: { name?: string | null } | null;
    image?: string | { id?: string | null } | null;
};

export type Post = {
    id: number | string;
    title: string;
    content: string;
    category: string;
    image: string | null;
};

export const getPosts = async (): Promise<Post[]> => {
    const res = await fetch(
        "http://localhost:8055/items/posts?fields=*,category.*,image.*",
        { cache: "no-store" }
    );

    if (!res.ok) {
        console.error("Failed to fetch posts from Directus", res.status, res.statusText);
        return [];
    }

    const json = await res.json();
    const items: DirectusPostRecord[] = Array.isArray(json?.data) ? json.data : [];

    return items.map((post) => ({
        id: post.id,
        title: post.title || post.Title || "Untitled",
        content: post.content || "",
        category: post.category?.name || "No Category",
        image:
            typeof post.image === "string"
                ? `http://localhost:8055/assets/${post.image}`
                : post.image?.id
                    ? `http://localhost:8055/assets/${post.image.id}`
                    : null,
    }));
};