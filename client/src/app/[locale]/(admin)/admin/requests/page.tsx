import { Metadata } from 'next';

import { TableRequests } from '@/pages';

export const metadata: Metadata = {
  title: 'Requests',
  description: 'Requests page',
};
const Dashboard = () => {
  return <TableRequests />;
};

export default Dashboard;
