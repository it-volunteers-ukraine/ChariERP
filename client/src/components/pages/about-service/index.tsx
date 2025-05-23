'use client';

import { useTranslations } from 'next-intl';

import { Banner } from '@/components/banner';
import { AboutCardType } from '@/components/service-body/about-card-type';
import {
  JoinUs,
  SectionTitle,
  ChangedContent,
  AboutCardWithType,
  ServiceListWithTitle,
} from '@/components/service-body';

import { getStylesAboutService } from './styles';
import { automatization, planning, beneficiary } from './config';

export const AboutServicePage = () => {
  const titleLogo = useTranslations('projectName');
  const cardTitle = useTranslations(`aboutService.cardsTitle`);
  const titleSection = useTranslations('aboutService.titleSection');
  const titleSectionTextEnd = useTranslations('aboutService.titleSection');

  const style = getStylesAboutService();

  return (
    <>
      <Banner />

      <section className={style.section}>
        <SectionTitle company={titleLogo('CHARIeRp')} text={titleSection('automatizationSection')} />

        <div className={style.automatization}>
          {automatization.map((card) => (
            <AboutCardWithType {...card} title={cardTitle(card.title)} key={card.title} />
          ))}
        </div>
      </section>

      <section className={style.section}>
        <SectionTitle company={titleLogo('CHARIeRp')} text={titleSection('planningSection')} />

        <div className={style.planningSection}>
          {planning.map((card, idx) => (
            <AboutCardWithType
              img={card.img}
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
        <SectionTitle company={titleLogo('CHARIeRp')} text={titleSection('beneficiary')} />

        <div className={`${style.beneficiary}`}>
          {beneficiary.map((card, idx) => (
            <AboutCardWithType
              img={card.img}
              type={AboutCardType.XL}
              key={`${card.title}_${idx}`}
              title={cardTitle(card.title)}
            >
              <ServiceListWithTitle info={card.info} />
            </AboutCardWithType>
          ))}
        </div>
      </section>

      <section className={style.section}>
        <SectionTitle
          type="companyMiddle"
          company={titleLogo('CHARIeRp')}
          text={titleSection('previewStart')}
          textEnd={titleSectionTextEnd('previewEnd')}
        />

        <ChangedContent />
      </section>

      <JoinUs />
    </>
  );
};
