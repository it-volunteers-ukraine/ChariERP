import Image from 'next/image';

import { Loader } from '@/assets/icons';

import { getStyles } from './styles';
import { AvatarProps } from './types';

export const AvatarEmployee = ({ src, name, className, surname, isLoading }: AvatarProps) => {
  const styles = getStyles(className);

  return (
    <div className={styles.wrapper}>
      {src && !isLoading && (
        <Image fill src={src} loading="lazy" className="h-full w-full object-cover" alt={`${surname} ${name}`} />
      )}

      {!src && !isLoading && <p className={styles.defaultAvatar}>{name?.[0] + surname?.[0]}</p>}

      {isLoading && <Loader className={styles.spinner} />}
    </div>
  );
};
