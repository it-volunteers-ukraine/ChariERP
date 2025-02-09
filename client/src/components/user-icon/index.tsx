import Image from 'next/image';

import { lettersToColor } from '@/utils';

import { getStyles } from './styles';

interface IUserIconProps {
  width?: number;
  lastName: string;
  avatarUrl: string;
  firstName: string;
  withoutRing?: boolean;
}

export const UserIcon = ({ firstName, lastName, avatarUrl, width = 24, withoutRing }: IUserIconProps) => {
  const color = lettersToColor(firstName, lastName);
  const isBig = width ? width === 40 : false;

  const size = isBig ? 40 : width;

  const styles = getStyles({ width, withoutRing });

  const isAvatar = avatarUrl?.length === 0;

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: isAvatar ? `${color}` : '',
      }}
    >
      {isAvatar ? (
        <span>{`${firstName?.[0]}${lastName?.[0]}`}</span>
      ) : (
        <Image src={avatarUrl} alt="avatar" className={styles.avatar} width={size} height={size} />
      )}
    </div>
  );
};
