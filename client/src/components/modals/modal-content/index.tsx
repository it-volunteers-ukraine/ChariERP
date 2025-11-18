'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { EllipsisText, RadioField } from '@/components';

import { getStyles } from './styles';
import { IModalContent } from './types';
import { Warning } from '@/assets/icons';

export const ModalContent = ({ name, setFieldValue, organizationName, values, error }: IModalContent) => {
  const modal = useTranslations('modal.decline');

  const [textareaValue, setTextareaValue] = useState('');

  const isOtherSelected = values ? values[name] === modal('radioBtn.other') : false;

  const styles = getStyles(isOtherSelected, !!error);

  return (
    <>
      <div className="tablet:gap-4 mb-1 flex flex-col gap-2">
        <div className="lending-6 text-mobster flex flex-col text-center">
          <EllipsisText content={organizationName}>
            <span className="line-clamp-1 wrap-break-word">{organizationName}</span>
          </EllipsisText>
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

        {error && (
          <div className="flex gap-3 pl-2">
            <Warning width={24} height={24} />

            <span className="text-input-error text-[14px]">{error}</span>
          </div>
        )}
      </div>
    </>
  );
};
