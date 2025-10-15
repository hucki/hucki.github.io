/**
 * Utility functions to calculate years of experience dynamically
 */

/**
 * Calculate years of experience from a start year to current year
 */
export function calculateYearsOfExperience(startYear: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

/**
 * Format years of experience with "+" suffix
 */
export function formatYearsExperience(years: number): string {
  return `${years}+ Years`;
}

/**
 * Format years of experience in German with "+" suffix
 */
export function formatYearsExperienceDE(years: number): string {
  return `${years}+ Jahre`;
}

/**
 * Career timeline constants
 */
export const CAREER_START_YEARS = {
  IT_TOTAL: 2002, // Started as IT Specialist
  SOFTWARE_DEV: 2020, // Started focused software development career
} as const;

/**
 * Get current years of IT experience
 */
export function getITExperienceYears(): number {
  return calculateYearsOfExperience(CAREER_START_YEARS.IT_TOTAL);
}

/**
 * Get current years of software development experience
 */
export function getSoftwareDevExperienceYears(): number {
  return calculateYearsOfExperience(CAREER_START_YEARS.SOFTWARE_DEV);
}

/**
 * Get formatted IT experience for English
 */
export function getFormattedITExperience(): string {
  return formatYearsExperience(getITExperienceYears());
}

/**
 * Get formatted software dev experience for English
 */
export function getFormattedSoftwareDevExperience(): string {
  return formatYearsExperience(getSoftwareDevExperienceYears());
}

/**
 * Get formatted IT experience for German
 */
export function getFormattedITExperienceDE(): string {
  return formatYearsExperienceDE(getITExperienceYears());
}

/**
 * Get formatted software dev experience for German
 */
export function getFormattedSoftwareDevExperienceDE(): string {
  return formatYearsExperienceDE(getSoftwareDevExperienceYears());
}
