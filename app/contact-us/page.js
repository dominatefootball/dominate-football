'use client';

import React, { useState } from 'react';

export default function ContactUsPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('dominatefootball@hotmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-black text-center">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions about football news, transfers, or want to share feedback? 
        </p>
        
        <div className="text-xl">
          <p className="mb-4">📧 Mail us at:</p>
          
          {/* Regular mailto link */}
          <div className="mb-4">
            <a 
              href="mailto:dominatefootball@hotmail.com"
              className="text-arsenalRed font-semibold hover:text-red-700 transition-colors text-2xl"
            >
              dominatefootball@hotmail.com
            </a>
          </div>
          
          {/* Copy button for incognito/mobile users */}
          <button
            onClick={copyEmail}
            className="bg-arsenalRed text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            {copied ? '✓ Copied!' : '📋 Copy Email'}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            (Click email to open mail app, or copy button if that doesn't work)
          </p>
        </div>
      </div>
      
      <p className="text-gray-500">
        We typically respond within 24-48 hours ⚽
      </p>
    </main>
  );
}
