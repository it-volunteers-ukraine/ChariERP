import connectDB from '@/config/database';

async function Home() {
  await connectDB();

  return <>Home</>;
}

export default Home;
