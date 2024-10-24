import { IBoardData, IColumns, IIndexesForBoards } from '@/components';

const numberOfColumns = 2;

export const generateIndexesForBoards = (boards: IBoardData[]): IIndexesForBoards => {
  const indexesForBoards: IIndexesForBoards = {};

  for (let i = 0; i < numberOfColumns; i++) {
    const columnKey = `column-${i + 1}`;

    indexesForBoards[columnKey] = {};

    boards.forEach((_, index) => {
      if (index % numberOfColumns === i) {
        const columnPosition = Math.floor(index / numberOfColumns);

        indexesForBoards[columnKey][columnPosition] = index;
      }
    });
  }

  return indexesForBoards;
};

export const reorder = (list: IBoardData[], startIndex: number, endIndex: number): IBoardData[] => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result.map((item, index) => ({
    ...item,
    order: index + 1,
  }));
};

export const generateColumns = (boards: IBoardData[]): IColumns => {
  const columns: IColumns = {};

  for (let i = 0; i < numberOfColumns; i++) {
    const filteredBoards = boards.filter((_, index) => index % numberOfColumns === i);
    const mappedBoard = filteredBoards.map((item, index) => {
      const indexForBoard = generateIndexesForBoards(boards);

      return {
        ...item,
        [`column-${i + 1}`]: { [index]: indexForBoard[`column-${i + 1}`][index] },
      };
    });

    columns[`column-${i + 1}`] = mappedBoard;
  }

  return columns;
};
