import Image, { StaticImageData } from 'next/image';

import { ChildrenProps } from '@/types';

import { getStyleCard } from './style';

export interface IAboutServiceCard {
  title: string;
  className?: string;
  img: StaticImageData;
}

export const AboutServiceCard = ({ img, title, children, className }: ChildrenProps<IAboutServiceCard>) => {
  const style = getStyleCard(className);

  return (
    <div className="flex">
      <div className={style.wrapper}>
        <Image src={img} alt={title} className={style.icon} width={120} height={120} />

        <h3 className={style.title}>{title}</h3>

        {children && <div className={style.childrenWrapper}>{children}</div>}
      </div>
    </div>
  );
};
