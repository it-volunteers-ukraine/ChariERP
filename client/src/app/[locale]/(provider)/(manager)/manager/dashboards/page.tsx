import { Metadata } from 'next';

import { EmptyBoard } from './empty-board';

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Dashboards page',
};

const Dashboards = () => {
  return (
    <>
      <h2>Dashboards</h2>
      <EmptyBoard />
    </>
  );
};

export default Dashboards;
