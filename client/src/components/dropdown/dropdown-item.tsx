import clsx from 'clsx';

import { UserIcon } from '../user-icon';

interface IDropdownItemProps {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  checkbox?: React.ReactNode;
}

export const DropdownItem = ({ lastName, firstName, avatarUrl, checkbox }: IDropdownItemProps) => {
  return (
    <label
      className={clsx('border-arctic-sky hover:bg-super-blue mb-2 flex items-center gap-x-2 border-b p-[6px_8px]', {
        'cursor-pointer': checkbox !== undefined,
      })}
    >
      {checkbox !== undefined && checkbox}

      <UserIcon withoutRing lastName={lastName} firstName={firstName} avatarUrl={avatarUrl} />

      <p className="font-roboto-condensed text-comet line-clamp-1 max-w-[200px] text-base break-all">
        {`${firstName} ${lastName}`}
      </p>
    </label>
  );
};
