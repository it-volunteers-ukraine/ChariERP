import { IBoardData, IColumns, IIndexesForBoards } from '@/components';

export const generateIndexesForBoards = (numOfColumns: number, boards: IBoardData[]): IIndexesForBoards => {
  const indexesForBoards: IIndexesForBoards = {};

  for (let i = 0; i < numOfColumns; i++) {
    const columnKey = `column-${i + 1}`;

    indexesForBoards[columnKey] = {};

    boards.forEach((_, index) => {
      if (index % numOfColumns === i) {
        const columnPosition = Math.floor(index / numOfColumns);

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

export const generateColumns = (numOfColumns: number, boards: IBoardData[]): IColumns => {
  const columns: IColumns = {};

  for (let i = 0; i < numOfColumns; i++) {
    const filteredBoards = boards.filter((_, index) => index % numOfColumns === i);
    const mappedBoard = filteredBoards.map((item, index) => {
      const indexForBoard = generateIndexesForBoards(numOfColumns, boards);

      return {
        ...item,
        [`column-${i + 1}`]: { [index]: indexForBoard[`column-${i + 1}`][index] },
      };
    });

    columns[`column-${i + 1}`] = mappedBoard;
  }

  return columns;
};
