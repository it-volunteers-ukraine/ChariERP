import { Metadata } from 'next';

import { EmployeesPage } from './employee-page';

export const metadata: Metadata = {
  title: 'Employees',
  description: 'Employees page',
};

function Employees() {
  return <EmployeesPage />;
}

export default Employees;
