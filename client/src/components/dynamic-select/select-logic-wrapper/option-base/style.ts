import { cn } from '@/utils';

interface IGetStyle {
  classNameOptionBase?: string;
}

export const getStyle = ({ classNameOptionBase }: IGetStyle) => ({
  wrapper: cn('flex w-full list-none items-center gap-4 border-b border-arcticSky py-2', classNameOptionBase),
});
