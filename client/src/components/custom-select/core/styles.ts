import { cn } from '@/utils';

interface ISelectStyles {
  isOpen: boolean;
  isLoading: boolean;
  isManager?: boolean;
  classNameWrapper: string | undefined;
  classNameDropList: string | undefined;
}

export const selectStyles = ({ classNameWrapper, classNameDropList, isOpen, isLoading, isManager }: ISelectStyles) => ({
  wrapper: cn(
    'select-wrapper border w-full border-arctic-sky relative p-2 rounded-lg cursor-pointer',
    classNameWrapper,
    { 'bg-light-blue-hover': isLoading },
    { 'rounded-b-none': isOpen },
    { 'bg-light-blue-hover': isOpen, 'bg-white': !isOpen && !isLoading },
    { 'cursor-default ': !isManager },
  ),
  dropList: cn(
    'absolute z-10 w-full overflow-hidden overflow-y-scroll gap-y-2 left-0 top-full border flex flex-col border-b-12 scroll-textarea border-arctic-sky bg-white py-2 px-4 ',
    classNameDropList,
    {
      'animate-open-selected-menu rounded-b-lg': isOpen,
      'animate-close-selected-menu ': !isOpen,
    },
  ),
});
