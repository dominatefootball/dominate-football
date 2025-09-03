'use client';

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>Dominate Football</strong>, accessible from https://dominatefootball.com, your privacy is one of our top priorities.
        This Privacy Policy document outlines the types of information we collect and how we use it.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Personal identification information (e.g. name, email address) if you submit it via contact forms</li>
        <li>Device and usage data (IP address, browser type, OS, pages visited, articles read) via analytics tools</li>
        <li>Football preferences and interests (favorite teams, leagues followed) to personalize content</li>
        <li>Cookies and similar tracking technologies (see our <a href="/cookie-policy" className="underline text-arsenalRed hover:text-red-700">Cookie Policy</a>)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>To understand user behavior and improve the website experience</li>
        <li>To respond to contact or feedback forms</li>
        <li>To personalize football content and news based on your preferences</li>
        <li>To analyze which football content is most popular among our readers</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Third-Party Services</h2>
      <p className="mb-4">
        We may use trusted third-party tools like Google Analytics for website analytics, social media platforms for content sharing, 
        and content management systems. These services may collect information as governed by their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Cookies</h2>
      <p className="mb-4">
        Cookies are used to enhance your browsing experience and remember your football preferences. You can choose to disable cookies through your browser settings.
        Read our <a href="/cookie-policy" className="underline text-arsenalRed hover:text-red-700">Cookie Policy</a> for more information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Retention</h2>
      <p className="mb-4">
        We retain your data only as long as necessary to fulfill the purposes outlined in this policy unless a longer retention
        period is required by law. Analytics data is typically retained for 26 months, while contact form submissions are kept for 2 years.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal data. 
        To exercise your rights, please contact us at{' '}
        <a href="mailto:dominatefootball@hotmail.com" className="underline text-arsenalRed hover:text-red-700">
          dominatefootball@hotmail.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Children's Privacy</h2>
      <p className="mb-4">
        Our website is not intended for children under the age of 13. We do not knowingly collect data from anyone under 13. 
        If you are a parent and believe your child has provided us with personal data, please contact us immediately.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Data Security</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, 
        alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We encourage you to review it periodically.
        Last updated: August 28, 2025.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns about this policy, please email us at{' '}
        <a href="mailto:dominatefootball@hotmail.com" className="underline text-arsenalRed hover:text-red-700">
          dominatefootball@hotmail.com
        </a>.
      </p>
    </main>
  );
}
