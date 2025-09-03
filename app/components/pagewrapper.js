'use client';

import React from 'react';

export default function pagewrapper({ children }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
