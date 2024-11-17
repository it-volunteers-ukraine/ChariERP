import { Adaptability, Defense, Efficiency, Happy, Integration, Support } from '../../assets/icons';

export const cardsData = (text: (key: string) => string) => [
  {
    icon: Integration,
    title: text('cards.firstCard.title'),
    text: text('cards.firstCard.text'),
  },
  {
    icon: Happy,
    title: text('cards.secondCard.title'),
    text: text('cards.secondCard.text'),
  },
  {
    icon: Efficiency,
    title: text('cards.thirdCard.title'),
    text: text('cards.thirdCard.text'),
  },
  {
    icon: Adaptability,
    title: text('cards.fourCard.title'),
    text: text('cards.fourCard.text'),
  },
  {
    icon: Defense,
    title: text('cards.fiveCard.title'),
    text: text('cards.fiveCard.text'),
  },
  {
    icon: Support,
    title: text('cards.sixCard.title'),
    text: text('cards.sixCard.text'),
  },
];
