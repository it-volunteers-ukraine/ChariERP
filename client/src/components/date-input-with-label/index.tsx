import { Loader } from '@/assets/icons';
import { ChildrenProps } from '@/types';

interface IDateInputWithLabel {
  label?: string;
  isLoading: boolean;
}

export const DateInputWithLabel = ({ label, children, isLoading }: ChildrenProps<IDateInputWithLabel>) => {
  return (
    <div className="flex w-full flex-col justify-between gap-2 tablet:w-full desktop:flex-row desktop:gap-6">
      <h4 className="min-w-max font-roboto font-medium text-comet">{label}</h4>
      {isLoading ? (
        <div className="relative flex justify-center rounded-lg border border-arcticSky bg-lightBlueHover p-2">
          <Loader className="w-6" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
