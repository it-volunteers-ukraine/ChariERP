import { cn } from '@/utils';

import { StylesProps } from './types';

export const getStyles = ({ className }: StylesProps) => ({
  title: cn('text-center font-scada font-semibold leading-[140%] text-dark-blue', className),
});
