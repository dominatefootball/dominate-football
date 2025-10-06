export default async function sitemap() {
  const baseUrl = 'https://dominate-football.vercel.app';
  
  // Static pages (always include these)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/transfers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Try to fetch blog posts
  let blogUrls = [];
  
  try {
    const strapiUrl = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const strapiToken = process.env.STRAPI_API_TOKEN;
    
    if (strapiUrl && strapiToken) {
      const blogsRes = await fetch(`${strapiUrl}/api/blogs?populate=*&pagination[limit]=100`, {
        headers: {
          'Authorization': `Bearer ${strapiToken}`
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        
        if (blogsData.data && Array.isArray(blogsData.data)) {
          blogUrls = blogsData.data
            .filter(blog => blog.attributes && blog.attributes.slug)
            .map((blog) => ({
              url: `${baseUrl}/blog/${blog.attributes.slug}`,
              lastModified: new Date(blog.attributes.updatedAt || blog.attributes.publishedAt || new Date()),
              changeFrequency: 'weekly',
              priority: 0.8,
            }));
        }
      }
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    // Continue with static pages even if blog fetch fails
  }

  return [...staticPages, ...blogUrls];
}
