import { MouseEventHandler } from 'react';

export interface ILogoProps {
  to?: string;
  className?: string;
  logoClass?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
