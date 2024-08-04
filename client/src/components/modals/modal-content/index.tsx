'use client';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { CheckboxRadioField } from '@/components';

import { getStyles } from './styles';
import { IModalContent } from './types';

export const ModalContent = ({ name, setFieldValue, organizationName }: IModalContent) => {
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
          name={name}
          type="radio"
          className="p-2"
          classNameText="text-mobster"
          label={modal('radioBtn.notValidUSREOU')}
          onChange={() => setFieldValue && setFieldValue(name, { id: '1', value: modal('radioBtn.notValidUSREOU') })}
        />

        <CheckboxRadioField
          id="2"
          multiple
          name={name}
          type="radio"
          className="p-2"
          classNameText="text-mobster"
          label={modal('radioBtn.insufficientDocuments')}
          onChange={() =>
            setFieldValue && setFieldValue(name, { id: '2', value: modal('radioBtn.insufficientDocuments') })
          }
        />

        <CheckboxRadioField
          id="3"
          multiple
          name={name}
          type="radio"
          className="p-2"
          classNameText="text-mobster"
          label={modal('radioBtn.noneCompliance')}
          onChange={() => setFieldValue && setFieldValue(name, { id: '3', value: modal('radioBtn.noneCompliance') })}
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
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={() =>
            setFieldValue &&
            setFieldValue(name, {
              id: '4',
              value: value,
            })
          }
        />
      </div>
    </>
  );
};
