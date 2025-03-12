'use client';

import { useRef } from 'react';
import { useLocale } from 'next-intl';
import Image, { StaticImageData } from 'next/image';

import { cn } from '@/utils';
import { useOutsideClick } from '@/hooks';
import { Location } from '@/assets/icons';
import { SocialIcon } from '@/components';
import * as Images from '@/assets/about-us';

import './style.css';
import { getStyles } from './style';

interface ICard {
  activeCard: string;
  setActiveCard: (id: string) => void;
  teamsMember: {
    id: string;
    name: string;
    url?: string;
    role?: string;
    nameEn: string;
    location?: string;
    locationEn?: string;
    social?: { [key: string]: string | undefined };
  };
}

export const Card = ({ teamsMember, setActiveCard, activeCard }: ICard) => {
  const { name, nameEn, url, role = 'Member', location = 'Україна', locationEn = 'Ukraine', social, id } = teamsMember;

  const locale = useLocale();
  const styles = getStyles();
  const isLinkAllowed = id === activeCard;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const socialKeys = Object.keys(social ?? {}).slice(0, 3);
  const images: { [key: string]: StaticImageData } = Images;
  const imageSrc = url && images[url] ? images[url] : images.default;
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const [firstName, lastName] = locale === 'ua' ? name.split(' ') : nameEn.split(' ');

  useOutsideClick(() => isTouchDevice && handleToggler(), wrapperRef);

  const handleToggler = (id?: string) => {
    setActiveCard(id || '');
  };

  return (
    <>
      <div className={styles.cardContainer} ref={wrapperRef} onClick={() => handleToggler(id)}>
        <div className="wrapper">
          <div className={cn(styles.cardSide, 'front', 'rounded-custom')}>
            <div className={styles.decorativeHeader}></div>

            <div className={styles.frontContent}>
              <div className={styles.decorativeCircle}></div>
              <div className={styles.decorativeBigCircle}></div>

              <div className={styles.wrapperPhoto}>
                <Image alt="Photo" src={imageSrc} className={styles.img} />
              </div>
              <p className={styles.name}>{firstName}</p>
              <p className={styles.name}>{lastName}</p>
              <p className={styles.description}>{role}</p>
            </div>
          </div>
          <div className={cn(styles.cardSide, 'back', 'rounded-custom-back')}>
            <div className={styles.decorativeHeader}></div>

            <div className={styles.backContent}>
              <div className={styles.decorativeCircle}></div>
              <div className={styles.decorativeBigCircle}></div>

              <div className={styles.wrapperLocation}>
                <Location className={styles.iconLocation} />
                <p className={styles.description}>{locale === 'ua' ? location : locationEn}</p>
              </div>

              <div className={styles.linkWrapper}>
                {social &&
                  socialKeys.map((key) => (
                    <a
                      key={key}
                      target="_blank"
                      href={social[key]}
                      className={styles.link}
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!isLinkAllowed && isTouchDevice) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <SocialIcon keyName={key} />
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div className="back-bottom-layer rounded-custom-back"></div>
          <div className="front-bottom-layer rounded-custom"></div>
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>
    </>
  );
};
