import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { UserStatus } from '@/types';
import { ArrowUp } from '@/assets/icons';

import { ISelect } from './types';
import { getStyles } from './styles';

export const Select = ({ status, setStatus, fieldName, setFieldValue }: ISelect) => {
  const cardTranslate = useTranslations('employeeCard');
  const statusDefault = status ? cardTranslate(status) : undefined;

  const [selected, setSelected] = useState(statusDefault ?? cardTranslate(UserStatus.ACTIVE));
  const [isOpen, setIsOpen] = useState(false);

  const isActive = selected === cardTranslate(UserStatus.ACTIVE);
  const styles = getStyles({ isOpen, isActive });

  const handleSelect = (value: UserStatus) => {
    const translatedValue = cardTranslate(value);

    setSelected(translatedValue);

    setIsOpen(false);
    if (setStatus) {
      setStatus(value);

      return;
    }

    if (setFieldValue && fieldName) {
      setFieldValue(fieldName, value);

      return;
    }
  };

  return (
    <div className="relative w-[140px] h-[36px]">
      <div className={styles.wrapper}>
        <div onClick={() => setIsOpen(!isOpen)} className={styles.selected}>
          {selected}

          <div className={styles.arrow}>
            <ArrowUp width={18} height={18} />
          </div>
        </div>

        <div className={styles.optionsWrapper}>
          {!isActive ? (
            <div className={`${styles.option} text-greenNormal`} onClick={() => handleSelect(UserStatus.ACTIVE)}>
              {cardTranslate(UserStatus.ACTIVE)}
            </div>
          ) : (
            <div className={`${styles.option} text-error`} onClick={() => handleSelect(UserStatus.BLOCKED)}>
              {cardTranslate(UserStatus.BLOCKED)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
