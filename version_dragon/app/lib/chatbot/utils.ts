import type { QuickAction } from './types';

/**
 * Generate a unique message ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format a timestamp nicely
 * Example: "10:30 AM" for today, "Yesterday 10:30 AM", "Jan 15, 10:30 AM"
 */
export function formatTimestamp(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    date.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString();

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  if (isToday) {
    return time;
  }

  if (isYesterday) {
    return `Yesterday ${time}`;
  }

  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return `${dateStr}, ${time}`;
}

/**
 * Quick action suggestions for common questions about Rayu
 */
export const quickActions: QuickAction[] = [
  {
    label: 'Experience',
    message: "What is Rayu's professional experience?",
  },
  {
    label: 'Projects',
    message: 'Can you tell me about some of your notable projects?',
  },
  {
    label: 'Skills',
    message: 'What technologies and skills do you specialize in?',
  },
  {
    label: 'Contact',
    message: 'How can I get in touch with you?',
  },
];
