import clsx from 'clsx';

import { IStylesAccordion } from './types';

export const getStyles = ({ isOpen, classNameTitle, classNameWrapper, classNameChildren }: IStylesAccordion) => ({
  wrapper: clsx('flex flex-col gap-6 box-border transition-all duration-300', {
    [`${classNameWrapper}`]: !!classNameWrapper,
    'gap-0': !isOpen,
  }),
  title: clsx('text-[20px] uppercase', {
    [`${classNameTitle}`]: !!classNameTitle,
  }),
  arrow: clsx('p-[6px] transition-all duration-300 rotate-[-180deg]', {
    'rotate-[0deg]': isOpen,
  }),
  children: clsx('transition-all duration-300 max-h-0 overflow-hidden', {
    [`${classNameChildren}`]: !!classNameChildren,
    'max-h-[1000px]': isOpen,
  }),
});
