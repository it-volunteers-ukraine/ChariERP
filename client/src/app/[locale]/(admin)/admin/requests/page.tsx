import { Metadata } from 'next';
import TableRequests from '@/components/pages/table-requests';

export const metadata: Metadata = {
  title: 'Requests',
  description: 'Requests page',
};
const Dashboard = () => {
  return <TableRequests />;
};

export default Dashboard;
