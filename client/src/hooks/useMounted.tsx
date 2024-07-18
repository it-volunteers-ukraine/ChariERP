'use client';
import { useEffect, useState } from 'react';

interface IUseMounted {
  opened: boolean;
  duration?: number;
}

export const useMounted = ({ opened, duration = 300 }: IUseMounted) => {
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    if (opened && !unmounted) {
      setUnmounted(true);
    }

    if (!opened && unmounted) {
      setTimeout(() => setUnmounted(false), duration);
    }
  }, [opened, duration, unmounted]);

  return { unmounted };
};
