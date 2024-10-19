'use client';
import { Loader } from '@/assets/icons';
import { getStyles } from './styles';
import { IButtonProps } from './types';

export const Button = ({
  text,
  Icon,
  onClick,
  disabled,
  className,
  isLoading,
  isNarrow = false,
  styleType = 'primary',
  ...props
}: IButtonProps) => {
  const styles = getStyles({
    disabled,
    isNarrow,
    styleType,
    className,
    isLoading,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if ((isLoading && disabled) || isLoading) {
      e.preventDefault();

      return;
    }

    onClick?.();
  };

  return (
    <button className={styles.btn} disabled={disabled} onClick={handleClick} {...props}>
      {isLoading && (
        <div className={styles.loader}>
          <Loader className={styles.spinner} />
        </div>
      )}

      {(text || props.children) && <span className={styles.span}>{text || props.children}</span>}

      {Icon && <div className={styles.iconWrapper}>{Icon}</div>}

      {!disabled && (styleType === 'primary' || styleType === 'icon-primary') && <div className={styles.overlay}></div>}
    </button>
  );
};
