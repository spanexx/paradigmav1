/**
 * Dashboard Style Utility Functions
 * 
 * This file contains utility functions that return CSS class names
 * based on input values. These functions are used to dynamically
 * apply appropriate styling to dashboard components based on
 * data values like trend, severity, stream type, and tag variant.
 */
import { AlertSeverity, StreamType, TagVariant, Trend } from '@paradigma/dashboard-data';

/**
 * Returns CSS classes for displaying trend indicators
 * @param trend The trend direction ('up', 'down', or 'flat')
 * @returns A string of CSS classes to apply to trend elements
 */
export const trendClass = (trend: Trend): string => {
  switch (trend) {
    case 'up':
      return 'trend-positive';
    case 'down':
      return 'trend-negative';
    default:
      return 'trend-neutral';
  }
};

/**
 * Returns CSS classes for displaying alerts based on severity
 * @param severity The alert severity ('critical', 'warning', or 'info')
 * @returns A string of CSS classes to apply to alert elements
 */
export const severityClass = (severity: AlertSeverity): string => {
  const palette: Record<AlertSeverity, string> = {
    critical: 'alert-critical',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  return palette[severity];
};

/**
 * Returns CSS classes for displaying stream type indicators
 * @param type The stream type ('portfolio', 'compliance', 'liquidity', or 'support')
 * @returns A string of CSS classes to apply to stream elements
 */
export const streamClass = (type: StreamType): string => {
  const palette: Record<StreamType, string> = {
    portfolio: 'stream-portfolio',
    compliance: 'stream-compliance',
    liquidity: 'stream-liquidity',
    support: 'stream-support',
  };

  return palette[type];
};

/**
 * Returns CSS classes for displaying tags based on variant
 * @param variant The tag variant ('violet', 'emerald', or 'amber')
 * @returns A string of CSS classes to apply to badge elements
 */
export const badgeClass = (variant: TagVariant): string => {
  const palette: Record<TagVariant, string> = {
    violet: 'badge-violet',
    emerald: 'badge-emerald',
    amber: 'badge-amber',

  };

  return palette[variant];
};
