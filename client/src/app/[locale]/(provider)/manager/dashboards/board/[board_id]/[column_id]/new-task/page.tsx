import { Metadata } from 'next';

import { NewTask } from '@/components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `New Task`,
    description: `This is the new task page`,
  };
}
const New = () => {
  return <NewTask />;
};

export default New;
