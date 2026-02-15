/**
 * Analytics - Unified analytics interface for GA4 and PostHog
 *
 * Provides type-safe event tracking with automatic batching and error handling.
 */

// Event categories for type safety
export type EventCategory =
  | 'navigation'
  | 'engagement'
  | 'learning'
  | 'wallet'
  | 'authentication'
  | 'achievement'
  | 'error';

// Custom events for the academy
export interface AnalyticsEvents {
  // Navigation
  page_view: { page_path: string; page_title?: string };
  sidebar_expanded: Record<string, never>;
  sidebar_collapsed: Record<string, never>;

  // Learning
  course_viewed: { course_id: string; course_title: string };
  course_enrolled: { course_id: string; course_title: string };
  course_completed: { course_id: string; course_title: string; xp_earned: number };
  lesson_started: { course_id: string; lesson_id: string; lesson_title: string };
  lesson_completed: { course_id: string; lesson_id: string; xp_earned: number };
  challenge_attempted: { course_id: string; lesson_id: string; success: boolean };
  hint_revealed: { course_id: string; lesson_id: string };
  solution_revealed: { course_id: string; lesson_id: string };

  // Wallet
  wallet_connected: { wallet_name: string; wallet_address: string };
  wallet_disconnected: Record<string, never>;
  wallet_linked: { wallet_address: string };

  // Authentication
  sign_in_started: { provider: string };
  sign_in_completed: { provider: string };
  sign_out: Record<string, never>;

  // Achievements
  achievement_unlocked: { achievement_id: string; achievement_name: string; xp_earned: number };
  streak_milestone: { days: number };
  level_up: { new_level: number; total_xp: number };

  // Engagement
  settings_updated: { tab: string };
  theme_changed: { theme: string };
  language_changed: { language: string };

  // Errors
  error_occurred: { error_type: string; error_message: string; component?: string };
  api_error: { endpoint: string; status_code: number; error_message: string };
}

type EventName = keyof AnalyticsEvents;

/**
 * Analytics singleton for tracking events
 */
class Analytics {
  private initialized = false;
  private gaId: string | null = null;
  private posthogLoaded = false;

  /**
   * Initialize analytics with config
   */
  init(config: { gaId?: string; posthogKey?: string; posthogHost?: string }) {
    if (this.initialized) return;

    this.gaId = config.gaId ?? null;

    // GA4 is loaded via script tag in layout
    if (typeof window !== 'undefined' && config.gaId) {
      this.initGA4(config.gaId);
    }

    // PostHog is initialized in posthog-provider
    if (config.posthogKey) {
      this.posthogLoaded = true;
    }

    this.initialized = true;
  }

  private initGA4(measurementId: string) {
    // GA4 gtag is loaded via Script component
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer ?? [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_path: window.location.pathname,
      });
    }
  }

  /**
   * Track a custom event
   */
  track<T extends EventName>(event: T, properties: AnalyticsEvents[T]) {
    try {
      // GA4
      if (typeof window !== 'undefined' && window.gtag && this.gaId) {
        window.gtag('event', event, properties);
      }

      // PostHog
      if (this.posthogLoaded && typeof window !== 'undefined') {
        const posthog = (window as unknown as { posthog?: { capture: (event: string, props: unknown) => void } }).posthog;
        posthog?.capture(event, properties);
      }

      // Debug in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', event, properties);
      }
    } catch (error) {
      console.error('[Analytics] Failed to track event:', error);
    }
  }

  /**
   * Identify a user
   */
  identify(userId: string, traits?: Record<string, unknown>) {
    try {
      // GA4 - set user ID
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('set', { user_id: userId });
        if (traits) {
          window.gtag('set', 'user_properties', traits);
        }
      }

      // PostHog
      if (this.posthogLoaded && typeof window !== 'undefined') {
        const posthog = (window as unknown as { posthog?: { identify: (id: string, traits?: unknown) => void } }).posthog;
        posthog?.identify(userId, traits);
      }
    } catch (error) {
      console.error('[Analytics] Failed to identify user:', error);
    }
  }

  /**
   * Reset user identity (on logout)
   */
  reset() {
    try {
      // PostHog
      if (this.posthogLoaded && typeof window !== 'undefined') {
        const posthog = (window as unknown as { posthog?: { reset: () => void } }).posthog;
        posthog?.reset();
      }
    } catch (error) {
      console.error('[Analytics] Failed to reset:', error);
    }
  }

  /**
   * Track page view
   */
  pageView(path: string, title?: string) {
    this.track('page_view', {
      page_path: path,
      ...(title && { page_title: title }),
    });
  }
}

// Singleton export
export const analytics = new Analytics();

// Type augmentation for window
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
