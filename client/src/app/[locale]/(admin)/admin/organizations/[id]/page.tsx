import { Metadata } from 'next';

import { AdminOrganizationById } from '@/components';

export const metadata: Metadata = {
  title: 'Organization ID',
  description: 'Organization ID',
};

const Edit = () => {
  return <AdminOrganizationById />;
};

export default Edit;
