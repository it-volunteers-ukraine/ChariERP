import { Metadata } from 'next';

import { DashboardPage } from './dashboard-page';

export const metadata: Metadata = {
  title: 'Requests',
  description: 'Requests page',
};
const Dashboard = () => {
  return <DashboardPage />;
};

export default Dashboard;
