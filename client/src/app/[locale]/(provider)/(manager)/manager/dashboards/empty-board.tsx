import React from 'react';

import { Info } from '@/assets/icons';
import { useTranslations } from 'use-intl';

export const EmptyBoard = () => {
  const memberText = useTranslations('errors.login');

  return (
    <div className="max-w-[706px] m-auto">
      <div className="text-lightBlue max-w-[140px] mb-8 mx-auto p-[18px]">
        <Info />
      </div>

      <h3 className="font-roboto text-[40px] text-center leading-[47px] text-lynch opacity-50 p-8">
        На даній сторінці ще не створено дошку з вашою участю {memberText('userIncorrect')}
      </h3>
    </div>
  );
};
