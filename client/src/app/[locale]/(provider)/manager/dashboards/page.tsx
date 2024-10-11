import { Metadata } from 'next';

import { Participants, TasksColumn } from '@/components';
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
      <TasksColumn />
      <EmptyBoard />
    </>
  );
};

export default Dashboards;
