import { ArrowLeft, Edit, Menu, Save } from '@/assets/icons';

import { icon } from '../types';

import { getStyles } from './style';

interface IIconBtnProps {
  icon: icon;
  type: 'primary' | 'secondary';
}

export const IconBtn = ({ icon, type }: IIconBtnProps) => {
  const { arrowLeft, edit, save, menu, arrowRight } = getStyles({ type });

  switch (icon) {
    case 'back':
      return <ArrowLeft className={arrowLeft} />;
    case 'forward':
      return <ArrowLeft className={arrowRight} />;
    case 'edit':
      return <Edit className={edit} />;
    case 'save':
      return <Save className={save} />;
    case 'menu':
      return <Menu className={menu} />;

    default:
      return null;
  }
};
