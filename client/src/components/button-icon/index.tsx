import { Button } from '../button';
import { IconBtn } from './icon-btn';
import { IButtonIconProps } from './types';

export const ButtonIcon = ({ icon, iconType, ...props }: IButtonIconProps) => {
  const btnType: 'icon-primary' | 'icon-secondary' = `icon-${iconType}`;

  return <Button {...props} styleType={btnType} Icon={<IconBtn icon={icon} type={iconType} />} />;
};
