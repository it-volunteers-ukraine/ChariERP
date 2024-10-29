import { Dashboards } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboards',
  description: 'Dashboards page',
};

const DashboardPage = () => {
  return <Dashboards />;
};

export default DashboardPage;
