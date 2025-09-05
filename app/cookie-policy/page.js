'use client';

import React from 'react';

export default function CookiePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-4">
        This Cookie Policy explains how <strong>Dominate Football</strong> uses cookies and similar technologies to recognize you when you visit our website at <strong>https://dominate-football.vercel.app</strong>.
        It explains what these technologies are, why we use them, and your rights to control their use.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small data files stored on your device when you visit a website. They are widely used to make websites work or function more efficiently, as well as to provide reporting information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Why We Use Cookies</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To remember your preferences and improve user experience</li>
        <li>To understand how users interact with the site (analytics)</li>
        <li>To enable certain features and functionalities</li>
        <li>To provide personalized football news and transfer updates</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Types of Cookies We Use</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>Essential Cookies:</strong> Required for core functionality (e.g., navigation, security)</li>
        <li><strong>Performance Cookies:</strong> Help us analyze how users interact with the site (e.g., Google Analytics)</li>
        <li><strong>Preference Cookies:</strong> Remember user choices (e.g., favorite teams, language, layout)</li>
        <li><strong>Marketing Cookies:</strong> Used to deliver relevant football content and advertisements</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-Party Cookies</h2>
      <p className="mb-4">
        Some cookies may be set by third-party services, like Google Analytics, social media platforms, or embedded content from other football-related sites.
        These services have their own privacy policies and may collect your IP address or browser information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. How to Control Cookies</h2>
      <p className="mb-4">
        You can control and/or delete cookies through your browser settings. You can also opt-out of certain third-party cookies using tools like:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline text-arsenalRed hover:text-red-700">
            Google Analytics Opt-out
          </a>
        </li>
        <li>
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="underline text-arsenalRed hover:text-red-700">
            YourAdChoices (NAI)
          </a>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy occasionally. We encourage you to review it regularly to stay informed about our use of cookies.
        Last updated: August 28, 2025.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about our use of cookies, please contact us at{' '}
        <a href="mailto:dominatefootball5@gmail.com" className="underline text-arsenalRed hover:text-red-700">
          dominatefootball5@gmail.com
        </a>.
      </p>
    </main>
  );
}
