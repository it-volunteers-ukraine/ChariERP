import { Metadata } from 'next';

import { Participants } from '@/components';
import { mokUserCount } from '@/components/participants/mock-user';

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Dashboards page',
};

const Dashboards = () => {
  return (
    <>
      <Participants users={mokUserCount} />
    </>
  );
};

export default Dashboards;
