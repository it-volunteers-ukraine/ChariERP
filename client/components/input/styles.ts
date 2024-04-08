import clsx from 'clsx';

interface IStylesInput {
  error?: boolean;
}

export const getStyles = ({ error }: IStylesInput) => ({
  span: 'text-[#E23A81]',
  input: clsx(
    'h-[56px] transition-all duration-300 border enabled:hover:border-2 rounded border-[#5D647C] disabled:border-[#D0CBCB]',
    {
      'border-[#E23A81]': error,
      'enabled:hover:border-[#79747E]': !error,
    },
  ),
});
