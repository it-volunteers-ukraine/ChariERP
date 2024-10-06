import { Metadata } from 'next';

import { OrganizationPage } from './organization-page';

export const metadata: Metadata = {
  title: 'Organization',
  description: 'Organization page',
};

const Organization = () => {
  return <OrganizationPage />;
};

export default Organization;
