import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { UserStatus } from '@/types';
import { ArrowUp } from '@/assets/icons';

import { ISelect } from './types';
import { getStyles } from './styles';

export const Select = ({ status, fieldName, setFieldValue }: ISelect) => {
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

    if (setFieldValue && fieldName) {
      setFieldValue(fieldName, value);

      return;
    }
  };

  useEffect(() => {
    if (status) {
      setSelected(cardTranslate(status));
    }
  }, [status]);

  return (
    <div className="relative h-[36px] w-[140px]">
      <div className={styles.wrapper}>
        <div onClick={() => setIsOpen(!isOpen)} className={styles.selected}>
          {selected}

          <div className={styles.arrow}>
            <ArrowUp width={18} height={18} />
          </div>
        </div>

        <div className={styles.optionsWrapper}>
          {!isActive ? (
            <div className={`${styles.option} text-green-normal`} onClick={() => handleSelect(UserStatus.ACTIVE)}>
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
