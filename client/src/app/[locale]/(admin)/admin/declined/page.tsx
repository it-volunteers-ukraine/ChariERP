import { Metadata } from 'next';

import { DeclinedPage } from './declined-page';

export const metadata: Metadata = {
  title: 'Declined',
  description: 'Declined page',
};
const Declined = () => {
  return <DeclinedPage />;
};

export default Declined;
