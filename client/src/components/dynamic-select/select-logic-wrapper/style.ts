import { cn } from '@/utils';

interface ISelectStyles {
  isOpen: boolean;
  classNameWrapper: string | undefined;
  classNameDropList: string | undefined;
}

export const selectStyles = ({ classNameWrapper, classNameDropList, isOpen }: ISelectStyles) => ({
  wrapper: cn(
    'select-wrapper border w-full',
    { 'rounded-b-none': isOpen },
    { 'bg-lightBlueHover': isOpen, 'bg-white': !isOpen },
    classNameWrapper,
  ),
  dropList: cn('absolute  z-10 w-full overflow-hidden overflow-y-scroll  ', classNameDropList, {
    'animate-openSelectedMenu rounded-b-lg': isOpen,
    'animate-closeSelectedMenu ': !isOpen,
  }),
});
