export const getStyles = () => ({
  wrapper: 'group/card hover:[transform:rotateY(180deg)]',
  decorativeCircle:
    'absolute top-[52px] tablet:top-[74px] desktop:top-[87px] left-2/4 h-[128px] w-[128px] -translate-y-2/4 -translate-x-2/4 rounded-full border-[1.5px] border-white tablet:h-[168px] tablet:w-[168px] desktop:h-[186px] desktop:w-[186px]',
  decorativeBigCircle:
    'absolute top-[52px] tablet:top-[74px] desktop:top-[87px] left-2/4 h-[180px] w-[180px] -translate-y-2/4 -translate-x-2/4 rounded-full border-b-[1.5px] border-b-white tablet:h-[236px] tablet:w-[236px] desktop:h-[262px] desktop:w-[262px]',
  card: ' relative h-full w-full overflow-hidden rounded-2xl bg-bgCardTeam tablet:rounded-3xl text-center',
  decorativeWrapper:
    'clip-angled absolute left-[7px] top-0 h-[27px] w-[150px] bg-bgDecorCardTeam tablet:left-[10px] tablet:h-[38px] tablet:w-[209px] desktop:h-[45px] desktop:w-[245px]',
  cardWrapper:
    'relative group-hover/card:[transform:rotateY(180deg)] transition-all duration-300 ease-in-out h-[208px] shadow-teamCard w-[156px] overflow-hidden rounded-bl-[28px] rounded-br-[16px] rounded-tl-[20px] rounded-tr-[20px] bg-bgSubCardTeam pl-2 pt-2 transition-all duration-300 ease-in-out tablet:h-[286px] tablet:w-[218px] tablet:rounded-bl-[42px] tablet:rounded-br-[24px] tablet:rounded-tl-[32px] tablet:rounded-tr-[32px] tablet:pl-3 tablet:pt-3 desktop:h-[338px] desktop:w-[256px]',
  description:
    'relative z-[1]  text-[14px] leading-4 text-midGray tablet:text-[16px] tablet:leading-[20px] desktop:text-[20px] desktop:leading-[24px]',
  name: 'relative z-[1] font-scada text-[13px] font-bold uppercase leading-4 text-dark-blue tablet:text-[16px] tablet:leading-[20px] desktop:text-[20px] desktop:leading-[24px]',
  img: 'rounded-full object-cover h-full w-full shadow-[0_2px_2px_0px_#65657526]',
  link: 'z-[1] relative h-10 w-10 p-2 desktop:p-1 desktop:h-12 desktop:w-12 transition-all duration-300 ease-in-out desktop:hover:p-0 hover:p-1',
  linkWrapper: 'flex justify-center tablet: gap-1 desktop:gap-5',
  iconLocation: 'bg-yellow mx-auto mb-3 h-10 w-10 rounded-full px-[13px] py-[11px] text-white',
  social: 'group-hover/card:block hidden',
  wrapperPhoto:
    'relative mx-auto mb-3 h-[68px] w-[68px] tablet:mb-6 tablet:h-[102px] tablet:w-[102px] desktop:mb-9 desktop:h-[122px] desktop:w-[122px]',
  wrapperLocation: 'relative h-[90px] tablet:h-[104px] ',
  cardFrontSide:
    'w-full tablet:py-5 desktop:py-6 desktop:py-8 flex flex-col justify-between group-hover/card:opacity-0 transition-all duration-300 ease-in-out opacity-100 absolute top-0 h-full px-3 py-4 tablet:p-5 left-2/4 -translate-x-1/2',
  cardBackSide:
    'w-full desktop:pt-[59px] desktop:pb-8 tablet:py-5 tablet:pb-8 tablet:pt-[37px] group-hover/card:opacity-100 transition-all duration-300 ease-in-out flex flex-col px-3 justify-between tablet:px-5 group-hover/card:z-[11] opacity-0 absolute top-0 left-2/4 h-full py-[21px] -translate-x-1/2',
});
