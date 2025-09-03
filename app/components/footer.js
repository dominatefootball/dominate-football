'use client';

import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  return (
    <>
      {/* Cookie Consent Banner - unchanged */}
      {showBanner && (
        <div
          id="cookie-consent-banner"
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-gray-100 border border-gray-300 text-gray-800 rounded-lg p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3 z-50"
        >
          <span className="text-sm">
            We use cookies to improve your experience. See our{' '}
            <a
              href="/cookie-policy"
              className="underline text-arsenalRed hover:text-red-600"
            >
              Cookie Policy
            </a>
            .
          </span>
          <div className="flex gap-2">
            <button
              className="text-sm px-4 py-1.5 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition-colors"
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className="text-sm px-4 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:border-gray-400"
              onClick={handleDecline}
            >
              Decline
            </button>
          </div>
        </div>
      )}

      {/* Site footer */}
      <footer className="bg-white bg-opacity-90 text-black py-3 px-4 shadow-inner mt-6 md:py-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row justify-between items-start md:flex-row md:justify-between md:gap-4">
            {/* Left Column: Site Navigation */}
            <div className="flex flex-col space-y-1 text-sm">
              <a href="/" className="hover:underline hover:text-arsenalRed">Home</a>
              <a href="/transfers" className="hover:underline hover:text-arsenalRed">Transfers</a>
              <a href="/news" className="hover:underline hover:text-arsenalRed">News</a>
              <a href="/about" className="hover:underline hover:text-arsenalRed">About</a>
            </div>
            {/* Right Column: Legal Links - mobile: align right, desktop: as before */}
            <div className="flex flex-col space-y-1 text-sm text-right md:text-left">
              <a href="/privacy-policy" className="hover:underline hover:text-arsenalRed">Privacy Policy</a>
              <a href="/terms" className="hover:underline hover:text-arsenalRed">Terms of Service</a>
              <a href="/cookie-policy" className="hover:underline hover:text-arsenalRed">Cookie Policy</a>
              <a href="/accessibility" className="hover:underline hover:text-arsenalRed">Accessibility Statement</a>
              <a href="/contact-us" className="hover:underline hover:text-arsenalRed">Contact Us</a>
            </div>
          </div>
          {/* Copyright */}
          <div className="mt-4 md:mt-3 text-center text-xs md:text-sm font-medium">
            &copy; {new Date().getFullYear()} Dominate football. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
