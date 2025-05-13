import { cn } from '@/utils';

interface IStyles {
  isManager: boolean;
}

export const getStyles = ({ isManager }: IStyles) => ({
  wrapperClassDate: cn('w-full desktop:w-[291px]', {
    '[&>div>div>div]:cursor-default': !isManager,
  }),
});
