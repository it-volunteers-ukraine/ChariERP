import { Metadata } from 'next';

import { Participants } from '@/components';
import { mokUserCount } from '@/components/participants/mock-user';

import { EmptyBoard } from './empty-board';

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Dashboards page',
};

const Dashboards = () => {
  return (
    <>
      <Participants users={mokUserCount} />
      <EmptyBoard />
    </>
  );
};

export default Dashboards;
