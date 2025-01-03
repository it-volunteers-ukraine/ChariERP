import { FC, SVGProps } from 'react';

import { ChildrenProps } from '@/types';

import { getStyleCard } from './style';

export interface IAboutServiceCard {
  title: string;
  className?: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

export const AboutServiceCard = ({ Icon, title, children, className }: ChildrenProps<IAboutServiceCard>) => {
  const style = getStyleCard(className);

  return (
    <div className="flex">
      <div className={style.wrapper}>
        <Icon className={style.icon} />

        <h3 className={style.title}>{title}</h3>

        {children && <div className={style.childrenWrapper}>{children}</div>}
      </div>
    </div>
  );
};
