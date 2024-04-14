import clsx from 'clsx';

interface IStylesLanguageSwitcher {
  className?: string;
  isNarrow?: boolean;
  activeLanguage?: 'en' | 'ua';
}

export const getStyles = ({
  isNarrow,
  className,
  activeLanguage,
}: IStylesLanguageSwitcher) => ({
  wrapper: clsx(
    'flex text-roboto overflow-hidden cursor-pointer justify-between items-center leading-[100%] bg-white text-dark-blue rounded-50 overflow-hidden relative',
    {
      [`${className}`]: className,
      'text-[10px] h-[24px] px-[6px] w-[48px] ': isNarrow,
      'text-[20px] h-[48px] px-[12px] w-[86px]': !isNarrow,
    },
  ),
  icon: clsx('absolute top-0 left-0 transition-all duration-300', {
    'w-[18px] h-[18px]': isNarrow,
    'w-[36px] h-[36px]': !isNarrow,
  }),
  en: clsx({
    'opacity-100': activeLanguage === 'en',
    'opacity-0': activeLanguage === 'ua',
  }),
  ua: clsx({
    'opacity-100': activeLanguage === 'ua',
    'opacity-0': activeLanguage === 'en',
  }),
  iconWrapper: clsx(
    'absolute top-1/2 -translate-y-1/2 left-[3px] w-[18px] h-[18px] transition-all duration-300',
    {
      'left-[3px] w-[18px] h-[18px]': isNarrow,
      'left-[5px] w-[36px] h-[36px] ': !isNarrow,
      'translate-x-[calc(100%+5px)]': activeLanguage === 'ua',
    },
  ),
  span: clsx('select-none', {
    'text-[10px]': isNarrow,
    'text-[20px]': !isNarrow,
  }),
});
