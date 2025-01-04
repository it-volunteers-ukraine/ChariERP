export interface IUsers {
  id: string;
  lastName: string;
  firstName: string;
  avatarUrl: string;
}

// export const mokUserCount: IUsers[] = [
//   {
//     id: '1',
//     firstName: 'John',
//     lastName: 'Deer',
//     avatarUrl: '',
//   },
//   { id: '2', firstName: 'Peter', lastName: 'Parker', avatarUrl: '' },
//   { id: '3', firstName: 'Tony', lastName: 'Stark', avatarUrl: '' },
//   { id: '4', firstName: 'Steve', lastName: 'Rogers', avatarUrl: '' },
//   { id: '5', firstName: 'Natasha', lastName: 'Romanoff', avatarUrl: '' },
//   { id: '6', firstName: 'Thor', lastName: 'Odinson', avatarUrl: '' },
//   { id: '7', firstName: 'Jane', lastName: 'Foster', avatarUrl: '' },
//   ...Array.from({ length: 98 }, (_, i) => ({
//     id: (i + 8).toString(),
//     firstName: `FirstName${i + 8}`,
//     lastName: `LastName${i + 8}`,
//     avatarUrl: '',
//   })),
// ];
