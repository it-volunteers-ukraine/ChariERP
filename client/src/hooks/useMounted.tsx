'use client';
import { useEffect, useState } from 'react';

interface IUseMounted {
  opened: boolean;
  duration: number;
}

export const useMounted = ({ opened, duration }: IUseMounted) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    }

    if (!opened && mounted) {
      setTimeout(() => setMounted(false), duration);
    }
  }, [opened, duration, mounted]);

  return { mounted };
};
