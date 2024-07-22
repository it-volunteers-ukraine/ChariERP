import TableOrganization from '@/components/pages/table-organization';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organizations',
  description: 'Organizations page',
};

const Organizations = () => {
  return <TableOrganization />;
};

export default Organizations;
