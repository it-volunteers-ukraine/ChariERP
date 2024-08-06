import { Metadata } from 'next';

import AdminPage from './admin-page';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Create Admin',
};

const Admin = () => {
  return <AdminPage />;
};

export default Admin;
