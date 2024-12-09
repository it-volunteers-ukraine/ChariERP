const decorativeCircle =
  'absolute  left-[70px] top-1/2 -translate-x-2/4 -translate-y-2/4 rounded-full border-[1.5px] border-[#CCE7F6] tablet:left-[80px]';

export const getStyles = () => ({
  section:
    'px-4 pb-16 tablet:mx-auto tablet:w-[704px] tablet:px-0 tablet:pb-24 laptop:w-[726px] desktop:flex desktop:w-full desktop:px-[138px] desktopXl:px-[240px] desktop:gap-10 desktop:pb-[132px]',
  wrapperPhoto:
    'relative  shrink-0 mx-auto mb-8 w-full tablet:h-[320px] tablet:w-[490px] laptop:h-[326px] laptop:w-[500px] desktop:mb-0 desktop:h-[366px] desktop:w-[562px] desktopXl:h-[360px] desktopXl:w-[552px]',
  img: 'relative z-[1] h-full w-full rounded-2xl object-cover tablet:rounded-3xl',
  circleOne: decorativeCircle + ' h-[138px] w-[138px] opacity-0 tablet:h-[206px] tablet:w-[206px] desktop:opacity-100',
  circleTwo: decorativeCircle + ' h-[180px] w-[180px] tablet:h-[270px] tablet:w-[270px]',
  circleThree: decorativeCircle + ' h-[255px] w-[255px] tablet:h-[380px] tablet:w-[380px]',
  wrapperHistory: 'grow',
  title:
    'mb-4 text-center font-scada text-[24px] font-bold uppercase leading-7 tablet:text-[32px] tablet:leading-[38px] desktop:text-left desktop:leading-[43px]',
  history: 'text-[16px] leading-[26px] text-blueGreen',
});
