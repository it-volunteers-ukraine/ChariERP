import { Metadata } from 'next';

import { RequestsId } from './requests-id';

export const metadata: Metadata = {
  title: 'Requests ID',
  description: 'Requests ID',
};

const Edit = () => {
  return <RequestsId />;
};

export default Edit;
