import { Icon } from '@/assets';

import { getStyles } from './styles';
import { InputProps } from './types';

export const Input = ({ disabled, type, label, error }: InputProps) => {
  const styles = getStyles({ error: !!error });

  return (
    <div>
      <div>
        <label>
          <span className={styles.span}>*</span> <span>{label}</span>
        </label>

        <input className={styles.input} disabled={disabled} type={type} />
      </div>
      {error && (
        <div>
          <Icon.Warning className="w-6 h-6" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
