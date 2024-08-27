import { Metadata } from 'next';

import { DeclinedId } from './declined-id';

export const metadata: Metadata = {
  title: 'Requests ID',
  description: 'Requests ID',
};

const Edit = () => {
  return <DeclinedId />;
};

export default Edit;
