import { IDataCards, mockCards } from '../../task-card/mock';

export interface IMockColumn {
  id: string;
  title: string;
  mockTasks: IDataCards[];
}

export const mockColumn: IMockColumn = {
  id: '1',
  title: 'colum 1',
  mockTasks: mockCards,
};
