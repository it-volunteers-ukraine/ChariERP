import { Metadata } from 'next';

import EmployeeId from './employee-id';

export const metadata: Metadata = {
  title: 'Add Member',
  description: 'Add Member',
};

const Employee = () => {
  return <EmployeeId />;
};

export default Employee;
