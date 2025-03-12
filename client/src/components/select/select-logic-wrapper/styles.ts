import { cn } from '@/utils';

interface ISelectStyles {
  isOpen: boolean;
  classNameWrapper: string | undefined;
  classNameDropList: string | undefined;
}

export const selectStyles = ({ classNameWrapper, classNameDropList, isOpen }: ISelectStyles) => ({
  wrapper: cn(
    'select-wrapper border w-full border-arcticSky relative p-2 rounded-lg',
    classNameWrapper,
    { 'rounded-b-none': isOpen },
    { 'bg-lightBlueHover': isOpen, 'bg-white': !isOpen },
  ),
  dropList: cn(
    'absolute z-10 w-full overflow-hidden overflow-y-scroll gap-y-2 left-0 top-full border flex flex-col border-b-[12px] scroll-textarea border-arcticSky bg-white py-2 px-4 ',
    classNameDropList,
    {
      'animate-openSelectedMenu rounded-b-lg': isOpen,
      'animate-closeSelectedMenu ': !isOpen,
    },
  ),
});
