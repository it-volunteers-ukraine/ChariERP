'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { debounce } from '@/utils';

const getDecodedValue = (value: string) => {
  return decodeURIComponent(value);
};

export const useSearch = (delay?: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [paramsState, setParamsState] = useState<{ [key: string]: string | undefined }>({});

  const updateSearchParams = useCallback(
    debounce((name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, encodeURIComponent(value));
      } else {
        params.delete(name);
      }

      router.push(`${pathname}?${params.toString()}`);
    }, delay),
    [router, pathname, searchParams],
  );

  const setSearch = useCallback(
    (name: string, value: string) => {
      updateSearchParams(name, value);
      setParamsState((prev) => ({ ...prev, [name]: value }));
    },
    [updateSearchParams],
  );

  useEffect(() => {
    const paramsObject: { [key: string]: string | undefined } = {};

    searchParams.forEach((value, key) => {
      paramsObject[key] = getDecodedValue(value);
    });

    setParamsState(paramsObject);
  }, [searchParams]);

  return { params: paramsState, onChange: setSearch };
};
