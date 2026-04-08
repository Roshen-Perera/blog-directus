type DirectusPostRecord = {
    id: number | string;
    title?: string | null;
    Title?: string | null; // In case the field is named "Title" instead of "title"
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
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
    const res = await fetch(
        `${directusUrl}/items/posts?fields=*,category.*,image.*`,
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
                ? `${directusUrl}/assets/${post.image}`
                : post.image?.id
                    ? `${directusUrl}/assets/${post.image.id}`
                    : null,
    }));
};