import { Metadata } from 'next';

import { Dashboards } from '@/components';

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Dashboards page',
};

const DashboardPage = () => {
  return <Dashboards />;
};

export default DashboardPage;
