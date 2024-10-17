'use client';

import { useState } from 'react';

import { Card } from './card';
import { IDataCards } from './mock';

interface IBoardTaskCard {
  cardData: IDataCards[];
}

export const BoardTaskCard = ({ cardData }: IBoardTaskCard) => {
  const [data, setData] = useState(cardData);

  return (
    <>
      {data.map((cardTask, idx) => (
        <Card
          {...cardTask}
          key={`id_card_${idx}`}
          onDelete={(id) => setData((prev) => prev.filter((item) => item.id !== id))}
        />
      ))}
    </>
  );
};
