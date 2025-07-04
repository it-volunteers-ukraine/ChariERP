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
      className={clsx('mb-2 flex items-center gap-x-2 border-b border-arcticSky p-[6px_8px] hover:bg-superBlue', {
        'cursor-pointer': checkbox !== undefined,
      })}
    >
      {checkbox !== undefined && checkbox}

      <UserIcon withoutRing lastName={lastName} firstName={firstName} avatarUrl={avatarUrl} />

      <p className="line-clamp-1 max-w-[200px] break-all font-robotoCondensed text-base text-comet">
        {`${firstName} ${lastName}`}
      </p>
    </label>
  );
};
