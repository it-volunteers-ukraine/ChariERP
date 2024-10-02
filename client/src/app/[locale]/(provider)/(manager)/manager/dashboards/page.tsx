import { Metadata } from 'next';

import { EmptyBoard } from './empty-board';

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Dashboards page',
};

const Dashboards = () => {
  return (
    <>
      <EmptyBoard />
    </>
  );
};

export default Dashboards;
