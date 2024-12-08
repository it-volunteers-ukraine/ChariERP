import { IUsers, mokUserCount } from '../participants/mock-user';

export interface IDataCards {
  id: string;
  title: string;
  users: IUsers[];
}

export const mockCards: IDataCards[] = [
  {
    title: 'Зустріч з підрядником Зустріч з підрядникомЗустріч з підрядником',
    id: '1-task',
    users: mokUserCount,
  },
  {
    title: 'title2title2title2title2title2title2title2title2title2',
    id: '2-task',
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
  {
    title: 'title3',
    id: '3-task',
    users: mokUserCount,
  },
  {
    title: 'titl e4titl hhe2t itle2ti tle2 title 2tit le2t itl e2t itle2ti tle2ti tle2t itle2 title2',
    id: '4-task',
    users: [
      { id: '1', firstName: 'Peter', lastName: 'Parker', avatarUrl: '' },
      { id: '2', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '3', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '4', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '5', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '6', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '7', firstName: 'Natasha', lastName: 'Romanoff', avatarUrl: '' },
      { id: '8', firstName: 'Steve', lastName: 'Rogers', avatarUrl: '' },
      { id: '9', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '10', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '11', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
      { id: '12', firstName: 'Jane', lastName: 'Foster', avatarUrl: '' },
    ],
  },
  // {
  //   title: 'title5 title2 title2 title2 title2 title2',
  //   id: '5-task',
  //   users: mokUserCount,
  // },
  // {
  //   title: 'title6',
  //   id: '6-task',
  //   users: mokUserCount,
  // },
  // {
  //   title: 'title7',
  //   id: '7-task',
  //   users: mokUserCount,
  // },
  // {
  //   title: 'title8',
  //   id: '8-task',
  //   users: mokUserCount,
  // },
];
