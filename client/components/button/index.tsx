import { getStyles } from './styles';
import { IButtonProps } from './types';

export const Button = ({
  text,
  onClick,
  disabled,
  className,
  isLoading,
  isNarrow = false,
  styleType = 'primary',
}: IButtonProps) => {
  const { btn, span, overlay } = getStyles({
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
    <button onClick={handleClick} disabled={disabled} className={btn}>
      <span className={span}>{text}</span>

      {!disabled && styleType === 'primary' && <div className={overlay}></div>}
    </button>
  );
};
