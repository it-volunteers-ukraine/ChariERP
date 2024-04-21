import { MouseEventHandler } from 'react';

export interface ILogoProps {
  to?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
