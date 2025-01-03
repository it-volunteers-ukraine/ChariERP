import { useTranslations } from 'next-intl';

import { IBeneficiary } from '@/components/pages/about-service/config';

import { AboutServiceList } from '../about-service-list';

interface IServiceListWithTitleProps {
  list?: string[];
  info?: IBeneficiary[];
}

export const ServiceListWithTitle = ({ list, info }: IServiceListWithTitleProps) => {
  const subTitleCard = useTranslations(`aboutService.subTitles`);

  return (
    <>
      {info && (
        <div className="flex h-full flex-col gap-y-4 rounded-[15px] border-[5px] border-blueBorder p-4">
          {info?.map(({ subTitle, texts }) => (
            <div key={subTitle}>
              <h3 className="pb-2 font-scada text-[18px] font-bold leading-[21px] tablet:text-[20px] tablet:leading-6 desktop:leading-7 desktop:text-[24xp]">
                {subTitleCard(subTitle)}
              </h3>

              <AboutServiceList
                className="pl-4"
                list={texts}
                listTextStyle="leading-[19px] tablet:text-[18px] tablet:leading-[22px] text-[16px]"
              />
            </div>
          ))}
        </div>
      )}
      {list && (
        <AboutServiceList
          list={list}
          listTextStyle="leading-[19px] tablet:text-xl tablet:leading-6 desktop:text-2xl desktop:leading-7"
        />
      )}
    </>
  );
};
