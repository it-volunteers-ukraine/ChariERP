import { Metadata } from 'next';

import { MaterialTable } from '@/components/material-react-table';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

const Home = () => {
  return (
    <div>
      <MaterialTable />
    </div>
  );
};

export default Home;
