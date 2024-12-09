'use client';

import { useLocale } from 'next-intl';
import Image, { StaticImageData } from 'next/image';

import { Location } from '@/assets/icons';
import { SocialIcon } from '@/components';
import * as Images from '@/assets/about-us';

import { getStyles } from './style';

interface ICard {
  teamsMember: {
    name: string;
    url?: string;
    role?: string;
    nameEn: string;
    location?: string;
    social?: { [key: string]: string | undefined };
  };
}

export const Card = ({ teamsMember }: ICard) => {
  const locale = useLocale();

  const { name, nameEn, url, role = 'Member', location = 'Ukraine', social } = teamsMember;

  const images: { [key: string]: StaticImageData } = Images;

  const imageSrc = url && images[url] ? images[url] : images.default;

  function formatName(name: string): string {
    return name.replace(' ', ' <br/>');
  }

  const socialKeys = Object.keys(social ?? {}).slice(0, 3);

  const styles = getStyles();

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.decorativeWrapper}></div>
      <div className={styles.card}>
        <div className={styles.decorativeCircle}></div>
        <div className={styles.decorativeBigCircle}></div>

        <div className={styles.cardFrontSide}>
          <div className={styles.wrapperPhoto}>
            <Image alt="Photo" src={imageSrc} className={styles.img} />
          </div>

          <p
            className={styles.name}
            dangerouslySetInnerHTML={{
              __html: locale === 'ua' ? formatName(name) : formatName(nameEn),
            }}
          ></p>
          <p className={styles.description}>{role}</p>
        </div>

        <div className={styles.cardBackSide}>
          <div className={styles.wrapperLocation}>
            <Location className={styles.iconLocation} />
            <p className={styles.description}>{location}</p>
          </div>
          <div className={styles.linkWrapper}>
            {socialKeys.map((key) => {
              if (!social) {
                return;
              }

              return (
                <a key={key} href={social[key]} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <SocialIcon keyName={key} className={styles.social} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
