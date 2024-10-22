import { Metadata } from 'next';

import { DashboardsPage } from './dashboards-page';

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Dashboards page',
};

const Dashboards = () => {
  return <DashboardsPage />;
};

export default Dashboards;
