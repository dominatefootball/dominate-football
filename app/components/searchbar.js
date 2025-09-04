'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getCloudinaryUrl } from '../../utils/imageUtils'; // ✅ ADDED: Import utility

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function
  const searchBlogs = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/blogs?populate[image]=true&filters[title][$containsi]=${query}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
          },
          cache: 'no-store'
        }
      );

      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.data.slice(0, 5));
        setIsOpen(data.data.length > 0);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchBlogs(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = () => {
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input - Made wider for better UX */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
          className="px-2 py-1 pr-8 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent placeholder-gray-500 w-24 sm:w-32 md:w-48 text-xs sm:text-sm"
        />

        {/* Search Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-8 flex items-center pr-1">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-arsenalRed"></div>
          </div>
        )}
      </div>

      {/* Dropdown Results - Improved positioning and width */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-xl border border-gray-200 z-50 max-h-60 sm:max-h-80 overflow-y-auto w-64 sm:w-80">
          {searchResults.map((blog) => {
            // ✅ UPDATED: Use utility function for search result images
            const imageUrl = getCloudinaryUrl(blog.image);

            return (
              <Link
                key={blog.id}
                href={`/${blog.category}/${blog.slug}`}
                onClick={handleResultClick}
                className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                {/* Blog Image */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={blog.title}
                    className="w-12 h-12 object-cover rounded mr-4 flex-shrink-0"
                  />
                )}

                {/* Blog Info */}
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {blog.author || 'Unknown'} • {blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : 'No date'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && searchTerm && searchResults.length === 0 && !isLoading && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 text-center text-gray-500 text-sm w-80">
          No matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
