// Utility to abstract analytics logic
// This allows you to easily switch providers (GA4, Mixpanel, Amplitude, Meta Pixel) later if needed.

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void; // Meta Pixel function definition
  }
}

/**
 * Tracks a specific event (e.g., 'button_click', 'quiz_completed')
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  // 1. Log to console for development
  console.log(`📊 [Analytics Event]: ${eventName}`, params);

  // 2. Send to GA4 if initialized
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // 3. Send to Meta Pixel if initialized
  if (typeof window !== 'undefined' && window.fbq) {
    // Mapping specific app events to Meta Standard Events for better ad optimization
    if (eventName === 'purchase_initiated') {
      // Cuando el usuario va a comprar -> InitiateCheckout
      window.fbq('track', 'InitiateCheckout', params);
    } else if (eventName === 'quiz_completed_success') {
      // Cuando terminan el quiz -> Lead (Cliente Potencial)
      window.fbq('track', 'Lead'); 
    } else if (eventName === 'quiz_start') {
      // Cuando empiezan -> ViewContent
      window.fbq('track', 'ViewContent', { content_name: 'Quiz Start' });
    } else {
      // Cualquier otro evento se registra como evento personalizado
      window.fbq('trackCustom', eventName, params);
    }
  }
};

/**
 * Tracks a screen view (Virtual Page View)
 * Essential for Single Page Applications (SPAs) like this one
 */
export const trackScreenView = (screenName: string) => {
  // 1. Log to console
  console.log(`📱 [Screen View]: ${screenName}`);

  // 2. Send to GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: screenName,
      page_location: window.location.href,
      page_path: `/${screenName.toLowerCase().replace(/_/g, '-')}`
    });
  }

  // 3. Send to Meta Pixel
  // Meta Pixel doesn't automatically track SPA route changes, so we force a PageView
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};