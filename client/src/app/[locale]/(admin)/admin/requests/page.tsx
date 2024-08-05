import { Metadata } from 'next';

import { RequestsPage } from './requests-page';

export const metadata: Metadata = {
  title: 'Requests',
  description: 'Requests page',
};

const Requests = () => {
  return <RequestsPage />;
};

export default Requests;
