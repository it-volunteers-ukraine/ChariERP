import { cn } from '@/utils';

interface IGetStyle {
  classNameOption?: string;
}

export const getStyle = ({ classNameOption }: IGetStyle) => ({
  wrapper: cn('flex w-full list-none items-center gap-4 border-b border-arcticSky py-2', classNameOption),
});
