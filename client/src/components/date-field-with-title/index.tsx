import { ChildrenProps } from '@/types';

interface IDataFieldWithTitle {
  title?: string;
}

export const DateFieldWithTitle = ({ title, children }: ChildrenProps<IDataFieldWithTitle>) => {
  return (
    <div className="flex w-full flex-col justify-between gap-2 tablet:w-full desktop:flex-row desktop:gap-6">
      <h4 className="min-w-max font-roboto font-medium text-comet">{title}</h4>
      {children}
    </div>
  );
};
