'use client';

import { useEffect } from 'react';
import { BASE_PATH } from '@/lib/site';

export default function PwaRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${BASE_PATH}/sw.js`).catch(() => {
        // SW registration is best-effort
      });
    }
  }, []);

  return null;
}