import clsx from 'clsx';

interface IStylesInput {
  error?: boolean;
}

export const getStyles = ({ error }: IStylesInput) => ({
  span: 'text-[14px]/[13px] text-[#E23A81] tracking-[0.4px]',
  label: 'text-[13px]/[13px] text-[#5D647C]',
  input: 'w-full h-full',
  fieldset: clsx(
    'w-full overflow-hidden h-[64px] transition-all duration-300 border enabled:hover:border-2 rounded border-[#5D647C] disabled:border-[#D0CBCB]',
    {
      'border-[#B3261E]': error,
      'enabled:hover:border-[#79747E]': !error,
    },
  ),
  error: 'text-[#B3261E] text-[12px]/[14px]',
});
