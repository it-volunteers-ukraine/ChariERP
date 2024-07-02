import clsx from 'clsx';
import { StyleType } from './types';

interface IStylesButton {
  isNarrow?: boolean;
  className?: string;
  styleType: StyleType;
}

const primaryClasses =
  'enabled:shadow-btn-inset disabled:bg-btn-disabled enabled:bg-btnPrimaryGradient bg-repeat bg-200 bg-[top_left] hover:bg-[bottom_right]';

const iconSize = 'w-9 h-9';

export const getStyles = ({ isNarrow, styleType, className }: IStylesButton) => ({
  btn: clsx(
    'group flex items-center justify-center overflow-hidden relative text-btn-text rounded-[50px] transition-all duration-300',
    {
      [`${className}`]: className,
      [`${primaryClasses}`]: styleType === 'primary',

      'bg-transparent enabled:active:border-transparent disabled:text-btn-outline-disabled disabled:border-btn-outline-disabled border enabled:border-btn-outline-border enabled:active:bg-btn-outline-active enabled:hover:bg-btn-outline enabled:hover:text-btn-outline-hover-text':
        styleType === 'outline',

      'border enabled:border-transparent enabled:bg-btn-secondary enabled:text-btn-secondary-text disabled:text-btn-secondary-disabled-text disabled:border-btn-secondary-disabled-border disabled:bg-btn-secondary-disabled-border disabled:text-btn-text enabled:hover:bg-btn-secondary-hover enabled:active:bg-btn-secondary-active enabled:hover:text-btn-text enabled:hover:text-btn-text':
        styleType === 'secondary',

      'bg-transparent border disabled:border-btn-secondary-disabled-border disabled:text-btn-secondary-disabled-text enabled:text-btn-text enabled:border-btn-outline-border enabled:hover:border-transparent enabled:hover:bg-btn-secondary-hover enabled:active:bg-btn-secondary-active':
        styleType === 'secondary-outline',
      'text-btn-text h-[44px] disabled:bg-btn-disabled enabled:bg-btn-green enabled:hover:bg-btn-green-hover enabled:active:bg-btn-green-active':
        styleType === 'green',
      'text-btn-text h-[44px] disabled:bg-btn-disabled enabled:bg-btn-red enabled:hover:bg-btn-red-hover enabled:active:bg-btn-red-active':
        styleType === 'red',
      [`${primaryClasses} ${iconSize}`]: styleType === 'icon-primary',
      [`enabled:bg-whiteSecond disabled:bg-btn-disabled ${iconSize}`]: styleType === 'icon-secondary',
      'enabled:bg-whiteSecond enabled:text-dimGray items-center disabled:bg-btn-disabled disabled:text-btn-white enabled:active:bg-lightBlue enabled:hover:bg-btn-steelBlue enabled:active:text-white enabled:hover:text-white':
        styleType === 'white',
    },
  ),
  iconWrapper: 'z-[3]',
  span: clsx('relative z-[1] select-none flex items-center justify-center text-scada', {
    'text-base leading-4 h-[42px] px-[20px]': !isNarrow,
    'text-xs leading-[14px] h-[24px] px-[12px]': isNarrow,
  }),
  overlay:
    'absolute top-0 enabled:shadow-btn-inset left-0 w-full h-full transition-all duration-300 opacity-0 z-[0] bg-btnActiveGradient group-active:opacity-100',
});
