'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/header';
import Footer from '../components/footer';
import PageWrapper from '../components/pagewrapper';
import { getCloudinaryUrl } from '../../utils/imageUtils';

async function fetchNews(page = 1, blogsPerPage = 6) {
  const start = (page - 1) * blogsPerPage;
  
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs?populate=*&filters[category][$eq]=news&pagination[start]=${start}&pagination[limit]=${blogsPerPage}&sort[0]=publishedDate:desc`,
  {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
    },
    cache: 'no-store'
  }
);

  const data = await res.json();
  return {
    blogs: data.data,
    totalBlogs: data.meta.pagination.total
  };
}

export default function NewsPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedClub, setSelectedClub] = useState('All Clubs');
  const [availableClubs, setAvailableClubs] = useState(['All Clubs']);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    async function loadBlogs() {
      try {
        const { blogs: blogData, totalBlogs } = await fetchNews(currentPage, blogsPerPage);
        setBlogs(blogData);
        setFilteredBlogs(blogData);
        setTotalPages(Math.ceil(totalBlogs / blogsPerPage));

        // Extract unique clubs from blog data
        const clubs = new Set(['All Clubs']);
        blogData.forEach(blog => {
          if (blog.Club) {
            clubs.add(blog.Club);
          }
        });

        setAvailableClubs([...clubs].sort());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false);
      }
    }

    loadBlogs();
  }, [currentPage]);

  // Filter blogs based on selected club
  useEffect(() => {
    let filtered;
    if (selectedClub === 'All Clubs') {
      filtered = blogs;
    } else {
      filtered = blogs.filter(blog => blog.Club === selectedClub);
    }

    setFilteredBlogs(filtered);
  }, [selectedClub, blogs]);

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <Header />
        <main className="p-10 min-h-screen">
          <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
            <div className="text-center py-10">Loading news...</div>
          </div>
        </main>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Header />
      <main className="p-10 min-h-screen">
        {/* outer translucent container – unchanged */}
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
          {/* Header with Title and Dropdown - positioned side by side */}
          <div className="flex items-center space-x-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">News</h1>

            {/* Club Filter Dropdown - right next to the title */}
            <select
              value={selectedClub}
              onChange={handleClubChange}
              className="w-36 md:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 cursor-pointer hover:border-red-400 text-sm md:min-w-40"
            >
              {availableClubs.map(club => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Cards Grid - Mobile: list style, Desktop: grid */}
          <div className="block sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 mb-8">
            {filteredBlogs.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                No news found for {selectedClub}
              </div>
            ) : (
              filteredBlogs.map(blog => {
                // ✅ UPDATED: Use the utility function to get proper Cloudinary URL
                const imageUrl = getCloudinaryUrl(blog.image);
                
                // ✅ ADDED: Debug logging (remove after testing)
                console.log('Blog:', blog.title, 'Image URL:', imageUrl);

                return (
                  <Link key={blog.id} href={`/news/${blog.slug}`}>
                    {/* Mobile: Horizontal card layout, Desktop: Original vertical card */}
                    <div className="flex gap-3 p-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow mb-3 sm:mb-0 sm:block sm:shadow-xl cursor-pointer sm:hover:scale-105 sm:transition-transform">

                      {/* Mobile: Small thumbnail on left, Desktop: Full width image on top */}
                      <div className="flex-shrink-0 w-20 h-20 sm:w-full sm:h-52">
                        {/* ✅ UPDATED: Added conditional rendering for missing images */}
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover rounded-lg sm:rounded-none sm:object-contain"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Mobile: Content on right, Desktop: Content below image */}
                      <div className="flex-1 min-w-0 sm:p-4">
                        <h2 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 sm:text-lg sm:mb-2">
                          {blog.title}
                        </h2>
                        <p className="text-xs text-gray-600 sm:text-sm sm:text-gray-800">
                          By {blog.author || 'Unknown'} on{' '}
                          {blog.publishedDate
                            ? new Date(blog.publishedDate).toDateString()
                            : 'Unknown Date'}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Pagination Controls - Only show if more than 1 page */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 sm:space-x-4 mt-8">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-base transition-colors ${currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                  }`}
              >
                &lt; Previous
              </button>

              {/* Page Info */}
              <div className="bg-gray-100 px-3 py-1 sm:px-6 sm:py-2 rounded-lg shadow-sm">
                <span className="text-gray-800 font-medium text-xs sm:text-base">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-base transition-colors ${currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-md'
                  }`}
              >
                Next &gt;
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </PageWrapper>
  );
}
