import { Metadata } from 'next';

import EmployeePage from './employee-id';

export const metadata: Metadata = {
  title: 'Add Member',
  description: 'Add Member',
};

const Employee = () => {
  return <EmployeePage />;
};

export default Employee;
