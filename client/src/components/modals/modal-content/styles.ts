import { cn } from '@/utils';

export const getStyles = (isChecked?: boolean, isError?: boolean) => ({
  textarea: cn(
    'p-[20px] w-full scroll-textarea h-[160px] focus:outline-none border rounded-md border-lightBlue bg-white text-mobster italic resize-y',
    {
      'border-input-error': isError,
      '!border-input-liteGray': !isChecked,
    },
  ),
});
