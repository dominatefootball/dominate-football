'use client';

import React from 'react';

export default function AccessibilityPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>

      <p className="mb-4">
        <strong>Dominate Football</strong> is committed to making our website accessible to everyone, including people with
        disabilities. We strive to ensure that our digital content meets the highest standards of accessibility as defined
        by the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Our Commitment</h2>
      <p className="mb-4">
        We believe that football content should be accessible to all fans, regardless of their abilities. 
        We continuously work to improve the accessibility of our website by:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Using semantic HTML and ARIA labels for better screen reader navigation</li>
        <li>Ensuring sufficient color contrast for text and backgrounds</li>
        <li>Making all content navigable by keyboard for users who cannot use a mouse</li>
        <li>Providing alternative text for images, including football photos and graphics</li>
        <li>Testing with screen readers and assistive technologies</li>
        <li>Ensuring all football news and transfer updates are accessible to everyone</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Accessibility Features</h2>
      <p className="mb-4">Our website includes the following accessibility features:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Skip to main content links</li>
        <li>Keyboard navigation support</li>
        <li>Descriptive headings and page structure</li>
        <li>Alternative text for all meaningful images</li>
        <li>High contrast color scheme</li>
        <li>Readable fonts and appropriate text sizing</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Ongoing Improvements</h2>
      <p className="mb-4">
        Accessibility is an ongoing effort. We regularly audit our website and implement best practices to enhance user
        experience for all visitors. We are committed to continuously improving our football content accessibility.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Known Issues</h2>
      <p className="mb-4">
        While we aim for full compliance, some content or features may not be fully accessible at all times, including:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Some older archived football articles may not meet current accessibility standards</li>
        <li>Third-party embedded content (videos, social media posts) may have limited accessibility</li>
        <li>Some images from external sources may lack comprehensive alternative text</li>
      </ul>
      <p className="mb-4">
        We are actively working to resolve these issues and update our content to meet accessibility standards.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Feedback & Support</h2>
      <p className="mb-4">
        If you encounter any accessibility barriers while using our site or have suggestions on how we can improve,
        please let us know. We value your feedback and are committed to addressing accessibility concerns promptly.
      </p>
      <p className="mb-4">
        You can reach us at{' '}
        <a href="mailto:dominatefootball5@gmail.com" className="underline text-arsenalRed hover:text-red-700">
          dominatefootball5@gmail.com
        </a>. We aim to respond to accessibility inquiries within 2-3 business days.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Alternative Access</h2>
      <p className="mb-4">
        If you're unable to access any football content on our website due to accessibility barriers, please contact us directly. 
        We can provide information in alternative formats or assist you in accessing the content you need.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Date of Statement</h2>
      <p className="mb-4">
        This accessibility statement was last updated on August 28, 2025. We review and update this statement regularly 
        as we continue to improve our website's accessibility.
      </p>
    </main>
  );
}
