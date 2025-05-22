import { Metadata } from 'next';

import { MaterialReactTable } from '@/components';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

const Home = () => {
  return (
    <div>
      <MaterialReactTable />
    </div>
  );
};

export default Home;
