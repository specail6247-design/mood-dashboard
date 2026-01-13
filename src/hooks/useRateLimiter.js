import { useState } from 'react';

const DAILY_LIMIT = 3;

export function useRateLimiter() {
  const [remaining, setRemaining] = useState(() => {
    if (typeof window === 'undefined') return DAILY_LIMIT;
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `rate_limit_${today}`;
    const used = parseInt(localStorage.getItem(storageKey) || '0', 10);
    return Math.max(0, DAILY_LIMIT - used);
  });

  const checkQuota = () => {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `rate_limit_${today}`;
    const used = parseInt(localStorage.getItem(storageKey) || '0', 10);
    return used < DAILY_LIMIT;
  };

  const incrementQuota = () => {
    const today = new Date().toISOString().split('T')[0];
    const storageKey = `rate_limit_${today}`;
    const used = parseInt(localStorage.getItem(storageKey) || '0', 10);
    localStorage.setItem(storageKey, (used + 1).toString());
    setRemaining(Math.max(0, DAILY_LIMIT - (used + 1)));
  };

  return { remaining, checkQuota, incrementQuota, limit: DAILY_LIMIT };
}
