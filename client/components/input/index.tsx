import { Icon } from '@/assets';

import { getStyles } from './styles';
import { InputProps } from './types';

export const Input = ({ disabled, type, label, error }: InputProps) => {
  const styles = getStyles({ error: !!error });

  return (
    <div className="flex flex-col gap-1 w-full">
      <fieldset className={styles.fieldset}>
        <legend className="ml-[10px] px-1 pb-1">
          <span className={styles.span}>*</span>
          <span className={styles.label}>{label}</span>
        </legend>

        <input className={styles.input} disabled={disabled} type={type} />
      </fieldset>

      {error && (
        <div className="flex gap-1">
          <Icon.Warning width={14} height={14} />

          <span className={styles.error}>{error}</span>
        </div>
      )}
    </div>
  );
};
