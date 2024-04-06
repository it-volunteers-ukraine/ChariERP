import clsx from 'clsx';

interface IStylesButton {
  isNarrow?: boolean;
  styleType: 'primary' | 'outline' | 'secondary' | 'secondary-outline';
}

export const getStyles = ({ isNarrow, styleType }: IStylesButton) => ({
  btn: clsx(
    'group flex items-center justify-center overflow-hidden relative text-btn-text rounded-[50px] transition-all duration-300',
    {
      'text-base leading-4 h-[42px] px-[20px]': !isNarrow,
      'text-xs leading-[14px] h-[24px] px-[12px]': isNarrow,
      'enabled:shadow-btn-inset disabled:bg-btn-disabled enabled:bg-btn-primary bg-repeat bg-200 bg-[top_left] hover:bg-[bottom_right]':
        styleType === 'primary',

      'bg-transparent enabled:active:border-transparent disabled:text-btn-outline-disabled disabled:border-btn-outline-disabled border enabled:border-btn-outline-border enabled:active:bg-btn-outline-active enabled:hover:bg-btn-outline enabled:hover:text-btn-outline-hover-text':
        styleType === 'outline',

      'border enabled:border-transparent enabled:bg-btn-secondary enabled:text-btn-secondary-text disabled:text-btn-secondary-disabled-text disabled:border-btn-secondary-disabled-border disabled:bg-btn-secondary-disabled-border disabled:text-btn-text enabled:hover:bg-btn-secondary-hover enabled:active:bg-btn-secondary-active enabled:hover:text-btn-text enabled:hover:text-btn-text':
        styleType === 'secondary',

      'bg-transparent border disabled:border-btn-secondary-disabled-border disabled:text-btn-secondary-disabled-text enabled:text-btn-text enabled:border-btn-outline-border enabled:hover:border-transparent enabled:hover:bg-btn-secondary-hover enabled:active:bg-btn-secondary-active':
        styleType === 'secondary-outline',
    },
  ),
  span: 'relative z-[1] select-none',
  overlay:
    'absolute top-0 enabled:shadow-btn-inset left-0 w-full h-full transition-all duration-300 opacity-0 z-[0] bg-btn-active group-active:opacity-100',
});
