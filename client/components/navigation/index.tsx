import Link from 'next/link';

import { links } from './mock';

import { getStyles } from './styles';
import { INavigationProps } from './types';

export const Navigation = ({ inHeader, className }: INavigationProps) => {
  const { link, ul } = getStyles({ inHeader, className });

  return (
    <ul className={ul}>
      {links.map(({ text, href }) => (
        <li>
          <Link href={href} className={link}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
