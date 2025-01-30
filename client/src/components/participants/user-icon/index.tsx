import Image from 'next/image';

import { lettersToColor } from '@/utils';

import { getStyles } from './styles';

interface IUserIconProps {
  small?: boolean;
  lastName: string;
  avatarUrl: string;
  firstName: string;
  withoutRing?: boolean;
}

export const UserIcon = ({ firstName, lastName, avatarUrl, small, withoutRing }: IUserIconProps) => {
  const color = lettersToColor(firstName, lastName);

  const styles = getStyles({ small, withoutRing });

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: `${color}`,
      }}
    >
      {avatarUrl?.length === 0 ? (
        <span>{`${firstName?.[0]}${lastName?.[0]}`}</span>
      ) : (
        <Image fill src={avatarUrl} alt="avatarUrl" className="aspect-square object-cover" />
      )}
    </div>
  );
};
