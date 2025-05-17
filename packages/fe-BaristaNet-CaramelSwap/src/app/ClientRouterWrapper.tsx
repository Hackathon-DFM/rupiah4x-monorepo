'use client';

import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ClientRouterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use this state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner, etc.
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}
