import Link from 'next/link';

import { links } from './mock';

import { getStyles } from './styles';
import { INavigationProps } from './types';

export const Navigation = ({ inHeader, className }: INavigationProps) => {
  const { link, ul } = getStyles({ inHeader, className });

  return (
    <ul className={ul}>
      {links.map(({ text, href }, idx) => (
        <li key={`navigation-item-${idx}`}>
          <Link href={href} className={link}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
