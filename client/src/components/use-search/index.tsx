'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { debounce } from '@/utils';

const getDecodedValue = (value: string) => {
  return decodeURIComponent(value);
};

export const useSearch = (params?: string[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState<string>('');
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
    }),
    [router, pathname, searchParams],
  );

  const setSearch = useCallback(
    (name: string, value: string) => {
      setSearchValue(value);
      updateSearchParams(name, value);
    },
    [updateSearchParams],
  );

  useEffect(() => {
    const paramsObject: { [key: string]: string | undefined } = {};

    if (params && params.length > 0) {
      params.forEach((key) => {
        const value = searchParams.get(key);

        if (value) {
          paramsObject[key] = getDecodedValue(value);
        }
      });
    } else {
      searchParams.forEach((value, key) => {
        paramsObject[key] = getDecodedValue(value);
      });
    }

    setParamsState(paramsObject);
  }, [searchParams]);

  return { paramsState, onChange: setSearch, value: searchValue };
};
