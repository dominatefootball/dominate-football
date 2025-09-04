'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import { getCloudinaryUrl } from '../../utils/imageUtils';


export default function BlogSlider({ blogs }) {
  const sliderInstanceRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create multiple duplicates for seamless infinite scroll
  const extendedSlides = [...blogs, ...blogs, ...blogs]; // Triple the slides for smoother infinite loop

  // Add color mapping function
  const getColorClass = (colorName) => {
    const colorMap = {
      red: 'text-arsenalRed',
      yellow: 'text-yellow-400',
      black: 'text-gray-800',
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-500',
      white: 'text-white',
    };
    return colorMap[colorName] || 'text-arsenalRed'; // default to Arsenal red if no color set
  };

  const [refCallback] = useKeenSlider({
    loop: true, // ✅ Changed to true for native infinite loop
    slides: {
      perView: 1,
      spacing: 15,
    },
    initial: blogs.length, // ✅ Start from middle set of slides
    slideChanged(slider) {
      const realIndex = slider.track.details.rel % blogs.length;
      setCurrentSlide(realIndex);
    },
    created(slider) {
      sliderInstanceRef.current = slider;
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    },
  });

  const moveToNextSlide = () => {
    if (sliderInstanceRef.current && blogs.length > 0) {
      sliderInstanceRef.current.next();
    }
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(moveToNextSlide, 3000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, blogs.length]);

  useEffect(() => {
    if (blogs.length > 0) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [blogs]);

  const handlePrev = () => {
    if (sliderInstanceRef.current) {
      sliderInstanceRef.current.prev();
      resetAutoSlide();
    }
  };

  const handleNext = () => {
    moveToNextSlide();
    resetAutoSlide();
  };

  return (
    <div className="w-full px-4">
      <div
        ref={refCallback}
        className={`keen-slider transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`} // ✅ Removed isJumping logic since there's no jump anymore
      >
        {extendedSlides.map((blog, index) => {
          const { id, title, author, publishedDate, slug, image, slidertitleColour } = blog;

          // ✅ UPDATED: Use the utility function to get correct Cloudinary image URL
          const imageUrl = getCloudinaryUrl(image) || '/placeholder.jpg';

          return (
            <div key={`${id}-${index}`} className="keen-slider__slide flex justify-center">
              <div className="relative w-[90vw] max-w-5xl h-[280px] sm:h-auto sm:w-[95vw]">
                <button
                  onClick={handlePrev}
                  className="slider-prev-btn absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 text-arsenalRed text-xl rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
                  aria-label="Previous Slide"
                >
                  &lt;
                </button>

                <button
                  onClick={handleNext}
                  className="slider-next-btn absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 text-arsenalRed text-xl rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
                  aria-label="Next Slide"
                >
                  &gt;
                </button>

                <Link href={`/${blog.category}/${blog.slug}`} className="block">
                  <div className="bg-white bg-opacity-90 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                    <div className="relative w-full h-[180px] sm:h-[300px] md:h-[350px]">
                      {/* ✅ UPDATED: Added conditional rendering for missing images */}
                      {imageUrl !== '/placeholder.jpg' ? (
                        <img
                          src={imageUrl}
                          alt={title}
                          className="absolute inset-0 w-full h-full object-contain scale-125 sm:scale-100"
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-2 sm:p-4">
                      <h2 className={`text-lg sm:text-xl md:text-2xl font-extrabold ${getColorClass(slidertitleColour)} tracking-tight mb-2 drop-shadow-md`}>
                        {title}
                      </h2>

                      <p className="text-sm text-gray-600">
                        By {author || 'Unknown'} on{' '}
                        {publishedDate
                          ? new Date(publishedDate).toDateString()
                          : 'Unknown Date'}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
