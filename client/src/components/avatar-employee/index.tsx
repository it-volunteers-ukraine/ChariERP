import Image from 'next/image';

import { getStyles } from './styles';
import { AvatarProps } from './types';

export const AvatarEmployee = ({ src, name, className, surname, isLoading }: AvatarProps) => {
  const styles = getStyles(className);

  return (
    <div className={styles.wrapper}>
      {src && !isLoading && (
        <Image
          src={src}
          layout="fill"
          loading="lazy"
          objectFit="contain"
          className="w-full h-full"
          alt={`${surname} ${name}`}
        />
      )}

      {!src && <p className={styles.defaultAvatar}>{name?.[0] + surname?.[0]}</p>}

      {isLoading && <p className={styles.defaultAvatar}>{name?.[0] + surname?.[0]}</p>}
    </div>
  );
};
