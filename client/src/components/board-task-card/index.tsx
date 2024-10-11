'use client';

import { useState } from 'react';

import { Card } from './card';
import { IMockCards } from './mock';

interface IBoardTaskCard {
  cardData: IMockCards[];
}

export const BoardTaskCard = ({ cardData }: IBoardTaskCard) => {
  const [data, setData] = useState(cardData);

  return (
    <>
      {data.map(({ id, title }, idx) => (
        <Card key={`id_card_${idx}`} idCard={id} title={title} setData={setData} data={data} />
      ))}
    </>
  );
};
