'use client';

import { useWindowWidth } from '@/hooks/useWindowWIdth';

type Endpoints =
  | 'isMobile'
  | 'isLaptop'
  | 'isTablet'
  | 'isDesktop'
  | 'isDesktopXL'
  | 'isNotMobile'
  | 'isNotDesktop';
interface IResponseProps {
  endpoint: Endpoints;
  children: React.ReactNode;
}

export const ResponseWrapper = ({ endpoint, children }: IResponseProps) => {
  const response = useWindowWidth();

  if (response[endpoint]) {
    return <>{children}</>;
  }

  return null;
};
