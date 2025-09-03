import React from 'react';
import BlogSlider from '../components/slider';

export default function BlogSliderClient({ blogs }) {
  const filteredBlogs = blogs.filter(blog => blog.title !== 'About this site');
  return <BlogSlider blogs={filteredBlogs} />;
}
