import clsx from 'clsx';

interface IGetStylesProps {
  isLogin: boolean;
  isRegistration: boolean;
}
export const getStyles = ({ isLogin, isRegistration }: IGetStylesProps) => ({
  main: clsx(
    'bg-bgAuthGradient py-10 tablet:px-8 h-[calc(100vh-61px)]',
    {
      'h-auto': isRegistration,
    },
    { 'desktop:h-[calc(100vh-68px)]': isLogin },
  ),
  wrapper: 'max-w-[1168px] mx-auto',
  wrapperChildren: clsx(
    'flex flex-col justify-center items-center w-full bg-white pt-9 desktop:pt-14 pb-14 desktop:pb-16 px-4 tablet:px-10 desktopXl:px-8 tablet:rounded-b-3xl shadow-auth',
    {
      'tablet:rounded-tl-3xl': isLogin,
    },
    {
      'tablet:rounded-tr-3xl': isRegistration,
    },
  ),
});
