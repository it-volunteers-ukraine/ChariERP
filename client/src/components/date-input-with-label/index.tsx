import { ChildrenProps } from '@/types';

interface IDateInputWithLabel {
  label?: string;
}

export const DateInputWithLabel = ({ label, children }: ChildrenProps<IDateInputWithLabel>) => {
  return (
    <div className="flex w-full flex-col justify-between gap-2 tablet:w-full desktop:flex-row desktop:gap-6">
      <h4 className="min-w-max font-roboto font-medium text-comet">{label}</h4>
      {children}
    </div>
  );
};
