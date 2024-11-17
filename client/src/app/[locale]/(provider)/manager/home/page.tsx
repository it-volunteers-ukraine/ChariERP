import { HomePage } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

const Home = () => {
  return <HomePage />;
};

export default Home;
