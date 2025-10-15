'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackEvent } from '@/lib/gtag';

/**
 * Componente que trackea las pageviews automáticamente
 * Se coloca en el layout principal
 */
export function Analytics() {
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
