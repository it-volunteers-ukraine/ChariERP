import { Metadata } from 'next';

import { DashboardId } from './dashboard-id';

export const metadata: Metadata = {
  title: 'Dashboard ID',
  description: 'Dashboard ID',
};

const Edit = () => {
  return <DashboardId />;
};

export default Edit;
