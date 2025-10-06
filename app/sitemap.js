export default async function sitemap() {
  // Fetch your blog posts from Strapi
  try {
    const blogsRes = await fetch(`${process.env.STRAPI_API_URL}/api/blogs?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      cache: 'no-store',
    });
    
    const blogsData = await blogsRes.json();
    
    // Create blog URLs
    const blogUrls = blogsData.data.map((blog) => ({
      url: `https://dominate-football.vercel.app/blog/${blog.attributes.slug}`,
      lastModified: new Date(blog.attributes.updatedAt || blog.attributes.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Static pages
    const staticPages = [
      {
        url: 'https://dominate-football.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: 'https://dominate-football.vercel.app/news',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: 'https://dominate-football.vercel.app/transfers',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: 'https://dominate-football.vercel.app/about',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ];

    return [...staticPages, ...blogUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if blog fetch fails
    return [
      {
        url: 'https://dominate-football.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
