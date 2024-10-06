import { Metadata } from 'next';

import { CreatePage } from './create-page';

export const metadata: Metadata = {
  title: 'Create member',
  description: 'Create member',
};
const Create = () => {
  return <CreatePage />;
};

export default Create;
