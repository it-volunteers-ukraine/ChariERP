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
        <div className="border-blue-border flex h-full flex-col gap-y-4 rounded-[15px] border-[5px] p-4">
          {info?.map(({ subTitle, texts }) => (
            <div key={subTitle}>
              <h3 className="font-scada tablet:text-[20px] tablet:leading-6 desktop:text-[24px] desktop:leading-7 pb-2 text-[18px] leading-[21px] font-bold">
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
