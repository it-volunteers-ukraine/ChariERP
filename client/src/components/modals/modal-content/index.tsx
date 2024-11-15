'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { RadioField } from '@/components';

import { getStyles } from './styles';
import { IModalContent } from './types';
import { Warning } from '@/assets/icons';

export const ModalContent = ({ name, setFieldValue, organizationName, values, errors }: IModalContent) => {
  const modal = useTranslations('modal.decline');

  const [textareaValue, setTextareaValue] = useState('');

  const isOtherSelected = values ? values[name] === modal('radioBtn.other') : false;

  const styles = getStyles(isOtherSelected, !!errors.otherReason);

  return (
    <>
      <div className="mb-1 flex flex-col gap-4">
        <div className="lending-6 flex flex-col text-center text-mobster">
          <span className="break-words">{organizationName}</span>
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

        {errors.otherReason && (
          <div className="flex gap-3 pl-2">
            <Warning width={24} height={24} />

            <span className="text-[14px] text-input-error">{errors.otherReason}</span>
          </div>
        )}
      </div>
    </>
  );
};
