import { ChildrenProps } from '@/types';

import { AboutServiceCard, IAboutServiceCard } from '../about-service-card';

import { getStylesByType } from './style';

export enum AboutCardType {
  L = 'large',
  BASE = 'base',
  XL = 'x-large',
}

interface IAboutCardWithType extends ChildrenProps<Omit<IAboutServiceCard, 'className'>> {
  type?: AboutCardType;
}

export const AboutCardWithType = ({ type = AboutCardType.BASE, children, ...props }: IAboutCardWithType) => {
  const className = getStylesByType(Boolean(children));

  return (
    <AboutServiceCard className={className[type]} {...props}>
      {children}
    </AboutServiceCard>
  );
};
