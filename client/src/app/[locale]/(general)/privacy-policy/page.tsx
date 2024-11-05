import { Metadata } from 'next';

import { PrivacyPage } from './privacy-page';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Privacy policy page',
};

const Organization = () => {
  return <PrivacyPage />;
};

export default Organization;
