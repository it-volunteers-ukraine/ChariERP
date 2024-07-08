'use client';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { CheckboxRadioField } from '@/components';

import { getStyles } from './styles';
import { IModalContent } from './types';

export const ModalContent = ({ name, organizationName }: IModalContent) => {
  const radioRef: RefObject<HTMLInputElement> = useRef(null);
  const modal = useTranslations('modal.decline');
  const isChecked = radioRef.current?.checked;
  const styles = getStyles(isChecked);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (!isChecked) setValue('');
  }, [isChecked]);

  return (
    <>
      <div className="flex flex-col gap-4 mb-1">
        <div className="flex flex-col text-center text-mobster lending-6">
          <span>{organizationName}</span>
          <span>{modal('subTitle')}</span>
        </div>

        <CheckboxRadioField
          id="1"
          multiple
          name={name}
          type="radio"
          className="p-2"
          classNameText="text-mobster"
          label={modal('radioBtn.notValidUSREOU')}
        />

        <CheckboxRadioField
          id="2"
          multiple
          name={name}
          type="radio"
          className="p-2"
          classNameText="text-mobster"
          label={modal('radioBtn.InsufficientDocuments')}
        />

        <CheckboxRadioField
          id="3"
          multiple
          name={name}
          type="radio"
          className="p-2"
          classNameText="text-mobster"
          label={modal('radioBtn.nonCompliance')}
        />

        <CheckboxRadioField
          id="4"
          multiple
          name={name}
          type="radio"
          className="p-2"
          itemRef={radioRef}
          classNameText="text-mobster"
          label={modal('radioBtn.other')}
        />
      </div>

      <div>
        <textarea
          value={value}
          disabled={!isChecked}
          className={styles.textarea}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
};
