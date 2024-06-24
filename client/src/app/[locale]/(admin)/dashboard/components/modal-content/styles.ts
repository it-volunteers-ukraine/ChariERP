import clsx from 'clsx';

export const getStyles = (isChecked?: boolean) => ({
  textarea: clsx(
    'p-[20px] w-full h-[160px] focus:outline-none border rounded-md border-lightBlue bg-white text-mobster italic overflow-hidden',
    {
      'border-input-liteGray': !isChecked,
    },
  ),
});
