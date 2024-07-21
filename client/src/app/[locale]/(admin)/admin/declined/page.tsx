import { Metadata } from 'next';
import TableRequests from '@/pages/table-requests';

export const metadata: Metadata = {
  title: 'Declined',
  description: 'Declined page',
};
const Declined = () => {
  return <TableRequests />;
};

export default Declined;
