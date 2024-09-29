'use client';

import React, { useState } from 'react';

interface IBoard {
  id: string;
  title: string;
  order: number;
}

interface IDragAndDropProps {
  cardList: IBoard[];
  className?: string;
  dragElement: React.ReactElement;
  placeholder?: React.ReactElement;
  lastElement?: React.ReactElement;
  setCardList: (cards: IBoard[]) => void;
}

export const DragAndDrop: React.FC<IDragAndDropProps> = ({
  cardList,
  className,
  dragElement,
  setCardList,
  placeholder,
  lastElement,
}) => {
  const [directionLeft, setDirectionLeft] = useState(true);
  const [dragCard, setDragCard] = useState<IBoard | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const resetDragState = () => {
    setDragCard(null);
    setHoverIndex(null);
    setDirectionLeft(true);
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>, card: IBoard) => {
    setDragCard(card);
    const parent = e.target as HTMLElement;

    // const dragGhost = parent.cloneNode(true) as HTMLElement;

    // dragGhost.style.position = 'absolute';
    // dragGhost.style.top = '-9999px';
    // dragGhost.style.left = '-9999px';
    // dragGhost.style.opacity = '1';
    // console.log(dragGhost);

    // document.body.appendChild(dragGhost);

    // e.dataTransfer.setDragImage(dragGhost, 0, 0);

    if (card.order === cardList.length && placeholder) {
      setDirectionLeft(false);
      setHoverIndex(cardList.length - 1);
    }

    if (parent) {
      setTimeout(() => {
        parent.style.display = 'none';
        parent.style.position = 'absolute';
      }, 0);
    }
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const parent = e.target as HTMLElement;

    if (parent) {
      parent.style.display = '';
      parent.style.position = '';
    }

    resetDragState();
  };

  const drop = (e: React.DragEvent<HTMLDivElement>, newOrder: number) => {
    if (dragCard) {
      const newCardList = cardList.filter((item) => item.id !== dragCard.id);

      if (dragCard.order < newOrder) {
        newCardList.splice(newOrder - 2, 0, { ...dragCard, order: newOrder });
      } else {
        newCardList.splice(newOrder - 1, 0, { ...dragCard, order: newOrder });
      }

      setCardList(newCardList.map((item, index) => ({ ...item, order: index + 1 })));
    }
    resetDragState();
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDirectionLeft(!directionLeft);
  };

  const getElements = () => {
    const cardElements = cardList
      .sort((a, b) => a.order - b.order)
      .reduce((elements, card, index) => {
        if (hoverIndex === index && placeholder && directionLeft) {
          elements.push(
            React.cloneElement(placeholder, {
              key: card.id + index,
              onDrop: (e: React.DragEvent<HTMLDivElement>) => drop(e, card.order),
              onDragOver: (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
            }),
          );
        }

        elements.push(
          React.cloneElement(dragElement, {
            key: card.id,
            cardInfo: card,
            draggable: true,
            className: dragCard ? '' : '',
            onDragEnter: () => setHoverIndex(index),
            onDragEnd: (e: React.DragEvent<HTMLDivElement>) => dragEnd(e),
            onDragOver: (e: React.DragEvent<HTMLDivElement>) => dragOver(e),
            onDrop: (e: React.DragEvent<HTMLDivElement>) => drop(e, card.order),
            onDragStart: (e: React.DragEvent<HTMLDivElement>) => dragStart(e, card),
          }),
        );

        if (hoverIndex === index && placeholder && !directionLeft) {
          elements.push(
            React.cloneElement(placeholder, {
              key: card.id + index,
              onDragOver: (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
              onDrop: (e: React.DragEvent<HTMLDivElement>) => drop(e, card.order + 1),
            }),
          );
        }

        return elements;
      }, [] as JSX.Element[]);

    return cardElements;
  };

  return (
    <div className={className}>
      {getElements()}
      {lastElement && React.cloneElement(lastElement, { key: 'last' })}
    </div>
  );
};
