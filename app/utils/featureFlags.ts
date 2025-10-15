/**
 * Feature flags configuration
 * Used to control which features are enabled/disabled in the application
 */

export const FEATURE_FLAGS = {
  /**
   * Controls whether the CV section is displayed on the main page
   * Set to false to hide the CV section during content development
   */
  SHOW_CV_SECTION: false,

  /**
   * Controls whether the CV link appears in the navigation
   * When SHOW_CV_SECTION is false, this determines if the link should still appear
   * (useful for testing navigation behavior)
   */
  SHOW_CV_NAV_LINK: false,
} as const;

/**
 * Type-safe feature flag checker
 */
export function isFeatureEnabled(flag: keyof typeof FEATURE_FLAGS): boolean {
  return FEATURE_FLAGS[flag];
}
