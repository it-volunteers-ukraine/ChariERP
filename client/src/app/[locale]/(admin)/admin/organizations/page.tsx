import { Metadata } from 'next';
import { TableOrganization } from '@/components';

export const metadata: Metadata = {
  title: 'Organizations',
  description: 'Organizations page',
};

const Organizations = () => {
  return <TableOrganization />;
};

export default Organizations;
