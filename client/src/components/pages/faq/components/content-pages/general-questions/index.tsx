import React, { useState } from 'react';

import { MockData } from './mock';
import { Accordion } from '../../accordion';

export const GeneralQuestions = () => {
  const [active, setActive] = useState<number | null>(null);

  const toggleAccordion = (i: number) => {
    if (active === i) {
      setActive(null);

      return;
    }

    setActive(i);
  };

  return (
    <div className="flex flex-col gap-6 tablet:gap-8">
      {MockData.map((item, i) => {
        return (
          <Accordion
            text={item.text}
            title={item.title}
            active={active === i}
            key={i + 'acc' + item.title}
            onClick={() => toggleAccordion(i)}
          />
        );
      })}
    </div>
  );
};
