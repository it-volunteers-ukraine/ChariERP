import { Metadata } from 'next';

import { NewTask } from '@/components';
import { TaskPageParamsProps } from '@/types';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `New Task`,
    description: `This is the new task page`,
  };
}
const New = ({ params }: TaskPageParamsProps) => {
  return <NewTask params={params} />;
};

export default New;
