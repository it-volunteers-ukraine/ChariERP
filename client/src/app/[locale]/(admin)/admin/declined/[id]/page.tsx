import { Metadata } from 'next';

import { AdminOrganizationById } from '@/components';

export const metadata: Metadata = {
  title: 'Requests ID',
  description: 'Requests ID',
};

const Edit = () => {
  return <AdminOrganizationById />;
};

export default Edit;
