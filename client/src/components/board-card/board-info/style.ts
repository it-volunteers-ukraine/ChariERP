import { cn } from '@/utils';

const wrapperClass = 'mb-6 w-full h-[248px] tablet:h-[200px] laptop:h-[242px] desktop:h-[176px]';
const border = 'shadow-boardCard rounded-lg';
const buttonClass =
  'w-12 h-12 desktop:!w-6 desktop:h-6 flex justify-center items-center bg-transparent text-lightBlue hover:text-dark-blue active:text-greenActive disabled:text-disabled transition-all duration-300 desktop:mr-4 desktop:last:mr-0';

export const getStyles = (isEditing?: boolean) => ({
  wrapper: cn(
    'flex flex-col transition-all duration-300 bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer',
    wrapperClass,
    border,
  ),

  icon: 'w-6 h-6 mx-auto',
  editButton: cn(buttonClass, { 'text-greenActive': isEditing }),
  button: buttonClass,

  textarea: cn(
    'w-full h-[110px] tablet:h-[72px] laptop:h-[96px] desktop:h-[72px] font-scada font-bold text-[18px] tablet:text-[20px] tablet:leading-[24px] leading-[22px] text-comet uppercase resize-none bg-transparent focus:outline-none',
    {
      'pointer-events-none overflow-hidden line-clamp-5 tablet:line-clamp-3 laptop:line-clamp-4 desktop:line-clamp-3':
        !isEditing,
      'scroll-blue ': isEditing,
    },
  ),
});
