import Image from 'next/image';

import { getStyles } from './styles';
import { AvatarProps } from './types';

export const AvatarEmployee = ({ src, name, className, surname }: AvatarProps) => {
  const styles = getStyles(className);

  return (
    <div className={styles.wrapper}>
      {src && <Image loading="lazy" src={src} alt={`${surname} ${name}`} className="w-full h-full" />}

      {!src && <p className={styles.defaultAvatar}>{name[0] + surname[0]}</p>}
    </div>
  );
};
