import React from 'react';

import { TabsProps } from './types';
import { getStyles } from './styles';

export const Tabs = ({ active, setActive }: TabsProps) => {
  const tabs = ['загальні питання', 'реєстрація', 'облікові записи'];

  const styles = getStyles();

  return (
    <div className={styles.wrapper}>
      {tabs.map((tab, index) => {
        const isActive = active === index ? 'bg-bg-auth-links text-white' : 'text-lynch hover:text-dark-blue';
        const mobileTabs = active === 0 ? 'rounded-t-[32px]' : '';

        return (
          <button key={tab} onClick={() => setActive(index)} className={`${styles.btn} ${isActive} ${mobileTabs}`}>
            {tab}
          </button>
        );
      })}
    </div>
  );
};
