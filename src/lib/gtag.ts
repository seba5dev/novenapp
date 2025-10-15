/**
 * Google Analytics 4 - Utilidades
 * 
 * Este módulo maneja el tracking de eventos y pageviews con GA4
 */

// ID de medición de GA4 desde las variables de entorno
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Verifica si GA4 está habilitado
 */
export const isGAEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && typeof window !== 'undefined';
};

/**
 * Envía un pageview a GA4
 * Se llama automáticamente en cada cambio de ruta
 */
export const pageview = (url: string): void => {
  if (!isGAEnabled()) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Tipos de eventos personalizados
 */
interface GtagEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Envía un evento personalizado a GA4
 * 
 * @example
 * event({
 *   action: 'crear_novena',
 *   category: 'engagement',
 *   label: 'formulario_completado',
 *   value: 1
 * })
 */
export const event = ({ action, category, label, value }: GtagEvent): void => {
  if (!isGAEnabled()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Eventos predefinidos para el sitio
 */
export const trackEvent = {
  /**
   * Usuario inició el proceso de crear una novena
   */
  crearNovenaIniciado: () => {
    event({
      action: 'iniciar_creacion',
      category: 'novena',
      label: 'formulario_abierto',
    });
  },

  /**
   * Usuario completó la creación de una novena
   */
  crearNovenaCompletado: (slug: string) => {
    event({
      action: 'crear_novena',
      category: 'conversion',
      label: slug,
      value: 1,
    });
  },

  /**
   * Error al crear novena
   */
  crearNovenaError: (errorMessage: string) => {
    event({
      action: 'error_creacion',
      category: 'error',
      label: errorMessage,
    });
  },

  /**
   * Usuario compartió su novena
   */
  compartirNovena: (slug: string, method: 'link' | 'whatsapp' | 'facebook' | 'twitter') => {
    event({
      action: 'compartir',
      category: 'engagement',
      label: `${method}_${slug}`,
    });
  },

  /**
   * Usuario descargó PDF
   */
  descargarPDF: (slug: string) => {
    event({
      action: 'descargar_pdf',
      category: 'engagement',
      label: slug,
    });
  },

  /**
   * Usuario accedió a términos y condiciones
   */
  verTerminos: () => {
    event({
      action: 'ver_terminos',
      category: 'legal',
      label: 'click_terminos',
    });
  },

  /**
   * Usuario abrió una novena específica
   */
  abrirNovena: (slug: string) => {
    event({
      action: 'abrir_novena',
      category: 'engagement',
      label: slug,
    });
  },

  /**
   * Usuario vio un día específico de la novena
   */
  verDiaNovena: (dia: number) => {
    event({
      action: 'ver_dia',
      category: 'novena',
      label: `dia_${dia}`,
      value: dia,
    });
  },

  /**
   * Usuario instaló la PWA
   */
  instalarPWA: () => {
    event({
      action: 'instalar_pwa',
      category: 'engagement',
      label: 'pwa_instalada',
      value: 1,
    });
  },

  /**
   * Tracking de UTM sources
   */
  trackUTM: (utmSource: string, utmMedium?: string, utmCampaign?: string) => {
    event({
      action: 'utm_tracking',
      category: 'marketing',
      label: `source_${utmSource}_medium_${utmMedium || 'none'}_campaign_${utmCampaign || 'none'}`,
    });
  },
};

/**
 * Declaración de tipos para window.gtag
 */
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
