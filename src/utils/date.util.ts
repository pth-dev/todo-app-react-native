import { format, formatDistanceToNow } from 'date-fns';

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  return format(date, 'MMM dd, yyyy HH:mm');
}

/**
 * Formats a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

