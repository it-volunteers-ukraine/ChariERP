import { Organizations, Tablet, Users } from '@/assets/icons';
import { AddEmployee, Boards, BoardTask, EmployeesGeneral, Organization } from '@/assets/img';

export const changedMock = [
  {
    id: 1,
    Icon: Organizations,
    name: 'Organizations',
    content: [{ img: Organization }],
  },
  {
    id: 2,
    Icon: Users,
    name: 'Employees',
    content: [{ img: EmployeesGeneral }, { img: AddEmployee }],
  },
  {
    id: 3,
    Icon: Tablet,
    name: 'Boards',
    content: [{ img: Boards }, { img: BoardTask }],
  },
];
