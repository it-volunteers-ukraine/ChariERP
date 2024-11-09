import { IDataCards, mockCards } from '@/components/task-card/mock';

export interface IColumns {
  id: string;
  title: string;
  tasks: IDataCards[];
}

export const columns = [
  { id: '1', title: 'column 1', tasks: mockCards },
  { id: '2', title: 'column 2', tasks: [] },
  { id: '3', title: 'column 3', tasks: mockCards },
  { id: '4', title: 'column 4', tasks: mockCards },
  { id: '5', title: 'column 5', tasks: mockCards },
];
