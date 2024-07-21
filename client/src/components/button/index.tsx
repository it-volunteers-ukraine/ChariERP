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
  const { btn, span, overlay, iconWrapper, loader, spinner } = getStyles({
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

    onClick && onClick();
  };

  return (
    <button className={btn} disabled={disabled} onClick={handleClick} {...props}>
      {isLoading && (
        <div className={loader}>
          <Loader className={spinner} />
        </div>
      )}

      {text && <span className={span}>{text}</span>}

      {Icon && <div className={iconWrapper}>{Icon}</div>}

      {!disabled && (styleType === 'primary' || styleType === 'icon-primary') && <div className={overlay}></div>}
    </button>
  );
};
