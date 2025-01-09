'use client';

import { useTranslations } from 'next-intl';

import { JoinUs } from '@/components/service-body/section-join-us';
import { AboutCardType } from '@/components/service-body/about-card-type';
import { AboutCardWithType, SectionTitle, ServiceListWithTitle } from '@/components/service-body';

import { getStylesAboutService } from './styles';
import { automatization, planning, beneficiary } from './config';

export const AboutServicePage = () => {
  const titleLogo = useTranslations('projectName');
  const cardTitle = useTranslations(`aboutService.cardsTitle`);
  const titleSection = useTranslations('aboutService.titleSection');

  const style = getStylesAboutService();

  return (
    <>
      <section className={style.section}>
        <SectionTitle company={`${titleLogo('CHARIeRp')} `} text={`${titleSection('automatizationSection')} :`} />

        <div className={style.automatization}>
          {automatization.map((card) => (
            <AboutCardWithType {...card} title={cardTitle(card.title)} key={card.title} />
          ))}
        </div>
      </section>

      <section className={style.section}>
        <SectionTitle company={`${titleLogo('CHARIeRp')}`} text={`${titleSection('planningSection')} :`} />

        <div className={style.planningSection}>
          {planning.map((card, idx) => (
            <AboutCardWithType
              Icon={card.Icon}
              type={AboutCardType.L}
              key={`${card.title}_${idx}`}
              title={cardTitle(card.title)}
            >
              <ServiceListWithTitle list={card.texts} />
            </AboutCardWithType>
          ))}
        </div>
      </section>

      <section className={style.section}>
        <SectionTitle company={`${titleLogo('CHARIeRp')}`} text={`${titleSection('beneficiary')} :`} />

        <div className={`${style.beneficiary}`}>
          {beneficiary.map((card, idx) => (
            <AboutCardWithType
              Icon={card.Icon}
              type={AboutCardType.XL}
              key={`${card.title}_${idx}`}
              title={cardTitle(card.title)}
            >
              <ServiceListWithTitle info={card.info} />
            </AboutCardWithType>
          ))}
        </div>
      </section>

      <JoinUs />
    </>
  );
};
