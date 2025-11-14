import { Loader } from '@/assets/icons';
import { ChildrenProps } from '@/types';

interface IDateInputWithLabel {
  label?: string;
  isLoading: boolean;
}

export const DateInputWithLabel = ({ label, children, isLoading }: ChildrenProps<IDateInputWithLabel>) => {
  return (
    <div className="tablet:w-full desktop:flex-row desktop:gap-6 flex w-full flex-col justify-between gap-2">
      <h4 className="font-roboto text-comet min-w-max font-medium">{label}</h4>
      {isLoading ? (
        <div className="border-arctic-sky bg-light-blue-hover relative flex justify-center rounded-lg border p-2">
          <Loader className="w-6" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
