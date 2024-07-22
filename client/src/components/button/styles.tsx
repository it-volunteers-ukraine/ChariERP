import clsx from 'clsx';

import { StyleType } from './types';

interface IStylesButton {
  isNarrow?: boolean;
  className?: string;
  isLoading?: boolean;
  styleType: StyleType;
}

const primaryClasses =
  'enabled:shadow-btn-inset disabled:bg-btn-disabled enabled:bg-btnPrimaryGradient bg-repeat bg-200 bg-[top_left]';

const iconSize = 'w-9 h-9';

const blueSpinner = ['white', 'outline', 'secondary-outline', 'icon-secondary'];

export const getStyles = ({ isNarrow, styleType, className, isLoading }: IStylesButton) => ({
  btn: clsx(
    'group flex items-center justify-center overflow-hidden relative text-btn-text rounded-[50px] transition-all duration-300',
    {
      [`${className}`]: className,
      [`${primaryClasses}`]: styleType === 'primary',
      'cursor-wait': isLoading,

      'bg-transparent  disabled:text-btn-outline-disabled disabled:border-btn-outline-disabled border enabled:border-btn-outline-border':
        styleType === 'outline',
      'enabled:active:border-transparent enabled:active:bg-btn-outline-active enabled:hover:bg-btn-outline enabled:hover:text-btn-outline-hover-text':
        styleType === 'outline' && !isLoading,

      'border enabled:border-transparent enabled:bg-btn-secondary enabled:text-btn-secondary-text disabled:text-btn-secondary-disabled-text disabled:border-btn-secondary-disabled-border disabled:bg-btn-secondary-disabled-border disabled:text-btn-text':
        styleType === 'secondary',
      'enabled:hover:bg-btn-secondary-hover enabled:active:bg-btn-secondary-active enabled:hover:text-btn-text enabled:hover:text-btn-text':
        styleType === 'secondary' && !isLoading,

      'bg-transparent border disabled:border-btn-secondary-disabled-border disabled:text-btn-secondary-disabled-text enabled:text-btn-text enabled:border-btn-outline-border':
        styleType === 'secondary-outline',
      'enabled:hover:border-transparent enabled:hover:bg-btn-secondary-hover enabled:active:bg-btn-secondary-active':
        styleType === 'secondary-outline' && !isLoading,

      'text-btn-text disabled:bg-btn-disabled enabled:bg-btn-green': styleType === 'green',
      'enabled:hover:bg-btn-green-hover enabled:active:bg-btn-green-active': styleType === 'green' && !isLoading,

      'text-btn-text disabled:bg-btn-disabled enabled:bg-btn-red ': styleType === 'red',
      'enabled:hover:bg-btn-red-hover enabled:active:bg-btn-red-active': styleType === 'red' && !isLoading,

      [`${primaryClasses} ${iconSize}`]: styleType === 'icon-primary',
      'hover:bg-[bottom_right]': (styleType === 'icon-primary' || styleType === 'primary') && !isLoading,

      [`enabled:bg-whiteSecond disabled:bg-btn-disabled ${iconSize}`]: styleType === 'icon-secondary',

      'enabled:bg-whiteSecond enabled:text-dimGray items-center disabled:bg-btn-disabled disabled:text-btn-white ':
        styleType === 'white',
      'enabled:active:bg-lightBlue enabled:hover:bg-btn-steelBlue enabled:active:text-white enabled:hover:text-white':
        styleType === 'white' && !isLoading,
    },
  ),
  iconWrapper: 'z-[3]',
  span: clsx('relative z-[1] select-none flex items-center justify-center font-scada', {
    'text-base leading-4 h-[42px] px-[20px]': !isNarrow,
    'px-[12px] text-xs leading-[14px] h-[24px]': isNarrow,
  }),
  overlay: clsx(
    'absolute top-0 enabled:shadow-btn-inset left-0 w-full h-full transition-all duration-300 opacity-0 z-[0] bg-btnActiveGradient',
    {
      'group-active:opacity-100': !isLoading,
    },
  ),
  loader: clsx(
    'absolute top-0 left-0 w-full h-full flex items-center justify-center z-[4] backdrop-blur-[1px] rounded-[60px]',
    {},
  ),
  spinner: clsx({
    'w-5 h-5': isNarrow,
    'w-6 h-6': !isNarrow,
    'text-dark-blue': blueSpinner.includes(styleType),
  }),
});
