import React, { useState } from 'react';

import { MockData } from './mock';
import { Accordion } from '../../accordion';

export const GeneralQuestions = () => {
  const [active, setActive] = useState<number[]>([]);

  const toggleAccordion = (i: number) => {
    if (active.includes(i)) {
      setActive(active.filter((item) => item !== i));

      return;
    }

    setActive([...active, i]);
  };

  return (
    <div className="flex flex-col gap-6 tablet:gap-8">
      {MockData.map((item, i) => {
        return (
          <Accordion
            text={item.text}
            title={item.title}
            active={active.includes(i)}
            key={i + 'acc' + item.title}
            onClick={() => toggleAccordion(i)}
          />
        );
      })}
    </div>
  );
};
