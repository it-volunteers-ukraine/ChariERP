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

  // Вставляем элемент на новую позицию endIndex
  result.splice(endIndex, 0, removed);

  // const temp = result[startIndex];

  // result[startIndex] = result[endIndex];
  // result[endIndex] = temp;

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

  const columnLengths = Object.keys(columns).map((key) => columns[key].length);

  if (numOfColumns === 2) {
    if (columnLengths[0] === columnLengths[1]) {
      columns['column-1'][columns['column-1'].length - 1] = {
        ...columns['column-1'][columns['column-1'].length - 1],
        isLast: true,
      };
    } else {
      columns['column-2'][columns['column-2'].length - 1] = {
        ...columns['column-2'][columns['column-2'].length - 1],
        isLast: true,
      };
    }
  }

  if (numOfColumns > 2) {
    let found = false;

    for (let i = numOfColumns - 1; i >= 0; i--) {
      if (!found && (i === 0 || columnLengths[i] !== columnLengths[i - 1])) {
        columns[`column-${i + 1}`][columns[`column-${i + 1}`].length - 1] = {
          ...columns[`column-${i + 1}`][columns[`column-${i + 1}`].length - 1],
          isLast: true,
        };
        found = true;
      }
    }
  }

  return columns;
};
