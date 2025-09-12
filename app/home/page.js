// app/home/page.js
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import BlogSliderClient from './BlogSliderClient.js';
import NewsPreview from '../components/NewsPreview'; // Import the new component

async function fetchBlogs() {
  // Modified: Limit to 7 blogs, sorted by latest first
  const res = await fetch(`${process.env.STRAPI_API_URL}/blogs?populate=*&sort=publishedDate:desc&pagination[limit]=7`, {
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
  const excludedBlogIds = [79, 80];  // don't show these in slider
  const featuredBlogId  = 40;       // must remain first
  /* ────────────────────────────── */

  // 1. apply exclusions (already sorted by date from API)
  const filteredBlogs = blogs
    .filter(blog => !excludedBlogIds.includes(blog.id));

  // 2. pull featured blog out of its position and unshift to index 0
  const idx = filteredBlogs.findIndex(b => b.id === featuredBlogId);
  if (idx > -1) {
    const [featured] = filteredBlogs.splice(idx, 1);
    filteredBlogs.unshift(featured);
  }

  // 3. Filter news blogs for the preview section (separate fetch for news)
  const newsRes = await fetch(`${process.env.STRAPI_API_URL}/blogs?populate=*&filters[category][$eq]=news&sort=publishedDate:desc`, {
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

        {/* NEW: Latest News Preview Section */}
        <NewsPreview newsBlogs={newsBlogs} />
      </main>
      <Footer />
    </div>
  );
}
