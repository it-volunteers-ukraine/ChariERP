import { IDataCards, mockCards } from '@/components/task-card/mock';

export interface IColumns {
  id: string;
  title: string;
  tasks: IDataCards[];
}

export const columns = [
  { id: '1', title: 'column 1', tasks: mockCards },
  {
    id: '2',
    title: 'column 2',
    tasks: [
      {
        title: 'title2ti',
        id: '55-task',
        users: [
          { id: '1', firstName: 'Peter', lastName: 'Parker', avatarUrl: '' },
          { id: '2', firstName: 'Peter', lastName: 'Parker', avatarUrl: '' },
          { id: '3', firstName: 'Tony', lastName: 'Stark', avatarUrl: '' },
          { id: '4', firstName: 'Steve', lastName: 'Rogers', avatarUrl: '' },
          { id: '5', firstName: 'Natasha', lastName: 'Romanoff', avatarUrl: '' },
          { id: '6', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
          { id: '7', firstName: 'Jane', lastName: 'Foster', avatarUrl: '' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'column 3',
    tasks: [
      {
        title: 'title2ti',
        id: '554-task',
        users: [],
      },
    ],
  },
  { id: '4', title: 'column 4', tasks: [] },
  { id: '5', title: 'column 5', tasks: [] },
];
