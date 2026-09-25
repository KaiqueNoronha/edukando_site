'use client';

import { useEffect } from 'react';
import Site from '@/screens/Site';

export default function HomePage() {
  useEffect(() => {
    document.body.style.background = 'white';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Site />
    </div>
  );
}
