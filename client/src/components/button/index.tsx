'use client';
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
  const { btn, span, overlay, iconWrapper } = getStyles({
    isNarrow,
    styleType,
    className,
  });

  const handleClick = () => {
    if ((isLoading && disabled) || isLoading) {
      return;
    }

    onClick && onClick();
  };

  return (
    <button
      className={btn}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {text && <span className={span}>{text}</span>}

      {Icon && <div className={iconWrapper}>{Icon}</div>}

      {!disabled &&
        (styleType === 'primary' || styleType === 'icon-primary') && (
          <div className={overlay}></div>
        )}
    </button>
  );
};
