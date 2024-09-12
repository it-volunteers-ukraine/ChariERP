import clsx from 'clsx';

const buttonClass =
  '!w-12 !h-12 flex justify-center items-center !bg-transparent text-lightBlue hover:text-dark-blue  active:text-greenActive disabled:text-disabled transition-all duration-300';

export const getStyles = (isEdited?: boolean) => ({
  icon: 'w-6 h-6 mx-auto',
  editButton: clsx(buttonClass, { '!text-greenActive': isEdited }),
  button: buttonClass,
  textarea: clsx(
    'w-full h-[110px] tablet:h-[72px] laptop:h-[120px] desktop:h-[48px] font-scada font-bold text-[18px] tablet:text-[20px] tablet:leading-[24px] leading-[22px] text-comet uppercase resize-none bg-transparent focus:outline-none ',
    {
      'pointer-events-none  overflow-hidden line-clamp-5 tablet:line-clamp-3 laptop:line-clamp-5': !isEdited,
      'scroll-blue ': isEdited,
    },
  ),
});
