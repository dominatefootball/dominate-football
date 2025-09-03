'use client';

import React from 'react';
import Link from 'next/link';

export default function NewsPreview({ newsBlogs }) {
  if (!newsBlogs || newsBlogs.length === 0) {
    return null;
  }

  const latestNews = newsBlogs.slice(0, 2);

  return (
    <section className="mt-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Latest News</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto rounded"></div>
        </div>

        {/* Transparent white background container - ONLY the 2 blocks */}
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-3 sm:p-6 mb-10">
          {/* 2-Grid Layout - Just the blog cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {latestNews.map((blog) => {
              const imageUrl = blog.image?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_IMAGE_BASE_URL}${blog.image.url}`
                : '/placeholder.jpg';


              return (
                <Link key={blog.id} href={`/news/${blog.slug}`}>
                  <div className="bg-white bg-opacity-95 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer h-full">
                    {/* Image */}
                    <div className="relative w-full h-24 sm:h-32">
                      <img
                        src={imageUrl}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-2 sm:p-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3">
                        By {blog.author || 'Unknown'} on{' '}
                        {blog.publishedDate
                          ? new Date(blog.publishedDate).toDateString()
                          : 'Unknown Date'}
                      </p>

                      {/* Content Preview */}
                      {blog.content && Array.isArray(blog.content) && blog.content[0]?.children?.[0]?.text && (
                        <p className="text-gray-700 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                          {blog.content[0].children[0].text.substring(0, 100)}...
                        </p>
                      )}

                      {/* Read More Button */}
                      <div className="mt-2 sm:mt-3">
                        <span className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-[10px] sm:text-xs">
                          Read More
                          <svg className="ml-1 w-2 h-2 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* SEPARATE CONTAINER for buttons with continuous animation */}
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg py-2 px-2 w-full max-w-56 sm:max-w-none mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* View News Button */}
            <div className="text-center">
              <Link href="/news">
                <button className="relative overflow-hidden bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 sm:py-2 sm:px-6 text-sm sm:text-base rounded-lg transition-colors duration-200 shadow-md shine-button">
                  <span className="relative z-10">View News</span>
                  <div className="absolute inset-0 flashlight-gradient opacity-100 animate-shine" style={{
                    animationDuration: '1.5s'
                  }}></div>
                </button>
              </Link>
            </div>

            {/* View Transfers Button */}
            <div className="text-center">
              <Link href="/transfers">
                <button className="relative overflow-hidden bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 sm:py-2 sm:px-6 text-sm sm:text-base rounded-lg transition-colors duration-200 shadow-md shine-button">
                  <span className="relative z-10">View Transfers</span>
                  <div className="absolute inset-0 flashlight-gradient opacity-100 animate-shine" style={{
                    animationDuration: '1.5s'
                  }}></div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
