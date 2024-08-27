import { Metadata } from 'next';

import { OrganizationId } from './organization-id';

export const metadata: Metadata = {
  title: 'Organization ID',
  description: 'Organization ID',
};

const Edit = () => {
  return <OrganizationId />;
};

export default Edit;
