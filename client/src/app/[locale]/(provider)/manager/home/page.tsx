import { Metadata } from 'next';

import { HomePage } from '@/components';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

const Home = () => {
  return <HomePage />;
};

export default Home;
