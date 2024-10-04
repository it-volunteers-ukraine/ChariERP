import clsx from 'clsx';

export const getStyles = (isLogin: boolean, isRegistration: boolean) => ({
  main: `bg-bgAuthGradient pt-10 tablet:p-[40px_0_50px] desktopXl:p-[40px_0_112px] tablet:px-8 min-h-[calc(100vh-61px)] desktop:min-h-[calc(100vh-68px)] scroll-blue`,
  wrapper: 'max-w-[1168px] mx-auto',
  children: clsx(
    'flex flex-col justify-center items-center w-full bg-white pt-9 desktop:pt-14 pb-14 desktop:pb-16 px-4 tablet:px-10 desktopXl:px-8 tablet:rounded-b-3xl shadow-auth',
    {
      'tablet:rounded-tl-3xl': isLogin,
    },
    {
      'tablet:rounded-tr-3xl': isRegistration,
    },
  ),
});
