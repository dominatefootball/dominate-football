// app/home/page.js
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import BlogSliderClient from './BlogSliderClient.js';
import NewsPreview from '../components/NewsPreview';

async function fetchBlogs() {
  const res = await fetch(`${process.env.STRAPI_API_URL}/api/blogs?populate=*&sort=publishedDate:desc&pagination[limit]=7`, {
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const json = await res.json();
  return json.data;
}

export default async function Home() {
  const blogs = await fetchBlogs();

  /* ───── configurable lists ───── */
  const excludedBlogSlugs = ['gabriel-heinze-to-join-artetas-coaching-staff']; // Use slugs instead of IDs
  const featuredBlogSlug = 'eze-joins-arsenal'; // ← CHANGE THIS to your featured blog's slug
  /* ────────────────────────────── */

  // 1. Apply exclusions using slug (more stable than ID)
  const filteredBlogs = blogs.filter(
    blog => !excludedBlogSlugs.includes(blog.attributes.slug)
  );

  // 2. Pull featured blog out by slug and unshift to index 0
  const idx = filteredBlogs.findIndex(
    b => b.attributes.slug === featuredBlogSlug
  );
  
  if (idx > -1) {
    const [featured] = filteredBlogs.splice(idx, 1);
    filteredBlogs.unshift(featured);
  } else {
    console.warn(`Featured blog with slug "${featuredBlogSlug}" not found!`);
  }

  // 3. Filter news blogs for the preview section
  const newsRes = await fetch(`${process.env.STRAPI_API_URL}/api/blogs?populate=*&filters[category][$eq]=news&sort=publishedDate:desc`, {
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
    cache: 'no-store',
  });
  
  const newsData = await newsRes.json();
  const newsBlogs = newsData.data;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-4 sm:p-6 md:p-10 min-h-screen">
        {/* Existing Slider */}
        {filteredBlogs.length === 0 ? (
          <p className="text-white text-center">No blogs found.</p>
        ) : (
          <BlogSliderClient blogs={filteredBlogs} />  
        )}

        {/* Latest News Preview Section */}
        <NewsPreview newsBlogs={newsBlogs} />
      </main>
      <Footer />
    </div>
  );
}
