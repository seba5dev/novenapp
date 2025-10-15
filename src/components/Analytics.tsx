'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackEvent } from '@/lib/gtag';

/**
 * Componente interno que trackea pageviews
 */
function AnalyticsInternal() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);

      // Trackear UTM params si existen
      const utmSource = searchParams?.get('utm_source');
      const utmMedium = searchParams?.get('utm_medium');
      const utmCampaign = searchParams?.get('utm_campaign');

      if (utmSource) {
        trackEvent.trackUTM(utmSource, utmMedium || undefined, utmCampaign || undefined);
      }
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Componente que trackea las pageviews automáticamente
 * Se coloca en el layout principal
 * Envuelto en Suspense para evitar errores de SSR
 */
export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInternal />
    </Suspense>
  );
}
