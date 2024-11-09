import { Metadata } from 'next';

import { Columns } from '@/components/columns';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

const Home = () => {
  return <Columns />;
};

export default Home;
