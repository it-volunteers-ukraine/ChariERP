import { Metadata } from 'next';

import { OrganizationId } from './organization-id';

export const metadata: Metadata = {
  title: 'Requests ID',
  description: 'Requests ID',
};

const Edit = () => {
  return <OrganizationId />;
};

export default Edit;
