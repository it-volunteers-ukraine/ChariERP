import { IButtonProps } from '../button/types';

export type icon = 'back' | 'forward' | 'edit' | 'save' | 'menu';

export interface IButtonIconProps extends Omit<IButtonProps, 'text' | 'isNarrow' | 'styleType' | 'Icon'> {
  icon: icon;
  iconType: TypeIConBtn;
}

export type TypeIConBtn = 'primary' | 'secondary';
