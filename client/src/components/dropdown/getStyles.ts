import { cn } from '@/utils';

export const getCheckboxStyles = (checked?: boolean) =>
  cn('text-lightBlue transition-opacity duration-300', checked && 'opacity-100', !checked && 'opacity-0');

export const getDropdownStyles = (className?: string) => {
  return {
    wrapper: cn('absolute left-0 top-0 z-50 w-[280px] rounded-lg border bg-arcticSky pb-3 shadow-dashboard', className),
  };
};
