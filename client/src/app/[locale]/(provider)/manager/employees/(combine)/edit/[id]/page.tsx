import { Metadata } from 'next';

import { EmployeeId } from './employee-id';

export const metadata: Metadata = {
  title: 'Edit member',
  description: 'Edit member',
};

const Employee = () => {
  return <EmployeeId />;
};

export default Employee;
