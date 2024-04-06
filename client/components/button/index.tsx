import { getStyles } from './styles';
import { IButtonProps } from './types';

export const Button = ({
  text,
  onClick,
  disabled,
  isLoading,
  styleType,
  isNarrow = false,
}: IButtonProps) => {
  const { btn, span, overlay } = getStyles({
    isNarrow: isNarrow,
    styleType: styleType,
  });

  const handleClick = () => {
    if (isLoading && disabled) {
      return;
    }
    onClick && onClick();
  };

  return (
    <>
      <button onClick={handleClick} disabled={disabled} className={btn}>
        <span className={span}>{text}</span>

        {!disabled && styleType === 'primary' && (
          <div className={overlay}></div>
        )}
      </button>
    </>
  );
};
