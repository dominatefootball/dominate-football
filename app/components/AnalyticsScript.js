'use client';

import { useEffect } from 'react';

export default function AnalyticsScript() {
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    const GA_MEASUREMENT_ID = null; // ← Leave null until you have an ID

    if (consent === 'accepted' && GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
      `;
      document.head.appendChild(inlineScript);
    }
  }, []);

  return null;
}
