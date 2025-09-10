'use client';

import React from 'react';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen">
      <div className="relative z-10">{children}</div>
    </div>
  );
}
