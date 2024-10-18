import { cn } from '@/utils';

import { IStylesAccordion } from './types';

export const getStyles = ({ isOpen, classNameTitle, classNameWrapper, classNameChildren }: IStylesAccordion) => ({
  wrapper: cn('flex flex-col gap-6 box-border transition-all duration-300', classNameWrapper, !isOpen && '!gap-0'),
  title: cn('text-[20px] uppercase', classNameTitle),
  arrow: cn('p-[6px] transition-all duration-300 rotate-[-180deg]', isOpen && 'rotate-[0deg]'),
  children: cn('overflow-hidden', classNameChildren),
});
