import { cn } from '@/utils';

const card = 'relative overflow-hidden rounded-2xl bg-bg-card-team tablet:rounded-3xl text-center';

export const getStyles = () => ({
  cardContainer: cn(
    'card',
    'relative h-[208px] w-[156px] tablet:h-[286px] tablet:w-[218px]  desktop:h-[338px] desktop:w-[256px]',
  ),
  cardSide:
    'absolute h-full w-full shadow-team-card overflow-hidden bg-bg-sub-card-team pl-2 pt-2 tablet:pl-3 tablet:pt-3',
  side: cn('side', 'bg-bg-sub-card-team'),
  decorativeHeader:
    'absolute clip-angled left-[7px] top-0 h-[27px] w-[150px] bg-bg-decor-card-team tablet:left-[10px] tablet:h-[38px] tablet:w-[209px] desktop:h-[45px] desktop:w-[245px]',
  card: 'relative h-full w-full overflow-hidden rounded-2xl bg-bg-card-team tablet:rounded-3xl text-center',
  decorativeCircle:
    'absolute top-[52px] tablet:top-[74px] desktop:top-[87px] left-2/4 h-[128px] w-[128px] -translate-y-2/4 -translate-x-2/4 rounded-full border-[1.5px] border-white tablet:h-[168px] tablet:w-[168px] desktop:h-[186px] desktop:w-[186px]',
  decorativeBigCircle:
    'absolute top-[52px] tablet:top-[74px] desktop:top-[87px] left-2/4 h-[180px] w-[180px] -translate-y-2/4 -translate-x-2/4 rounded-full border-b-[1.5px] border-b-white tablet:h-[236px] tablet:w-[236px] desktop:h-[262px] desktop:w-[262px]',
  wrapperPhoto:
    'mx-auto mb-3 h-[68px] w-[68px] tablet:mb-6 tablet:h-[102px] tablet:w-[102px] desktop:mb-9 desktop:h-[122px] desktop:w-[122px]',
  img: 'rounded-full object-cover h-full w-full shadow-[0_2px_2px_0px_#65657526]',
  name: 'relative z-1 font-scada text-[13px] font-bold uppercase leading-4 text-dark-blue tablet:text-[16px] tablet:leading-[20px] desktop:text-[20px] desktop:leading-[24px]',
  description:
    'relative z-1 text-[14px] leading-4 text-mid-gray tablet:text-[16px] tablet:leading-[20px] desktop:text-[20px] desktop:leading-[24px]',
  wrapperLocation: 'relative h-[90px] tablet:h-[104px] ',
  iconLocation: 'bg-yellow mx-auto mb-3 h-10 w-10 rounded-full px-[13px] py-[11px] text-white',
  linkWrapper: 'flex justify-center tablet:gap-1 desktop:gap-5',
  link: 'z-1 relative h-10 w-10 p-2 desktop:p-1 desktop:h-12 desktop:w-12 transition-all duration-300 ease-in-out desktop:hover:p-0 hover:p-1',
  frontContent: cn(
    card,
    'w-full h-full flex flex-col justify-between px-3 py-4 tablet:p-5 tablet:py-5 desktop:py-6 desktop:py-8',
  ),
  backContent: cn(
    card,
    'w-full h-full flex flex-col justify-between px-3 py-[21px] tablet:py-5 tablet:pb-8 tablet:pt-[37px] tablet:px-5 desktop:pt-[59px] desktop:pb-8',
  ),
});
