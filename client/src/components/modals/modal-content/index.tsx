'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { RadioField } from '@/components';

import { getStyles } from './styles';
import { IModalContent } from './types';

export const ModalContent = ({ name, setFieldValue, organizationName, values }: IModalContent) => {
  const modal = useTranslations('modal.decline');

  const [textareaValue, setTextareaValue] = useState('');

  const isOtherSelected = values ? values[name] === modal('radioBtn.other') : false;

  const styles = getStyles(isOtherSelected);

  return (
    <>
      <div className="flex flex-col gap-4 mb-1">
        <div className="flex flex-col text-center text-mobster lending-6">
          <span>{organizationName}</span>
          <span>{modal('subTitle')}</span>
        </div>

        <RadioField
          name={name}
          className="p-2"
          classNameText="text-mobster"
          value={modal('radioBtn.notValidUSREOU')}
          label={modal('radioBtn.notValidUSREOU')}
        />

        <RadioField
          name={name}
          className="p-2"
          classNameText="text-mobster"
          value={modal('radioBtn.insufficientDocuments')}
          label={modal('radioBtn.insufficientDocuments')}
        />

        <RadioField
          name={name}
          className="p-2"
          classNameText="text-mobster"
          value={modal('radioBtn.noneCompliance')}
          label={modal('radioBtn.noneCompliance')}
        />

        <RadioField
          name={name}
          className="p-2"
          classNameText="text-mobster"
          value={modal('radioBtn.other')}
          label={modal('radioBtn.other')}
        />
      </div>

      <div>
        <textarea
          name="otherReason"
          value={textareaValue}
          disabled={!isOtherSelected}
          className={styles.textarea}
          onChange={(e) => {
            setTextareaValue(e.target.value);
          }}
          onBlur={() => setFieldValue && setFieldValue('otherReason', textareaValue)}
        />
      </div>
    </>
  );
};
