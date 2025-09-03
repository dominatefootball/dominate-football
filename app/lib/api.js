// app/lib/api.js
const STRAPI_URL = "http://127.0.0.1:1337"; // use 127.0.0.1 instead of localhost (safer for fetch)

export async function fetchBlogs() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blogs`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store", // Ensure Next.js server doesn't cache stale data
    });

    if (!res.ok) {
      console.error("Failed response status:", res.status);
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("❌ Error fetching blogs:", err.message);
    return [];
  }
}
