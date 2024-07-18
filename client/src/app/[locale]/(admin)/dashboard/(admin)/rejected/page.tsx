import { Metadata } from 'next';

import { TableRequests } from '@/components';

export const metadata: Metadata = {
  title: 'Rejected',
  description: 'Rejected page',
};
const Rejected = () => {
  return <TableRequests />;
};

export default Rejected;
