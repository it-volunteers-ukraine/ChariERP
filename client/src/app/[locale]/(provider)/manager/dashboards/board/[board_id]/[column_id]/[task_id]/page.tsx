import { Metadata } from 'next';

import { EditTask } from '@/components';
import { TaskPageParamsProps } from '@/types';

export async function generateMetadata({ params }: TaskPageParamsProps): Promise<Metadata> {
  const { task_id } = await params;

  return {
    title: `Task - ${task_id}`,
    description: `This is the task page for ${task_id}`,
  };
}

const TaskId = ({ params }: TaskPageParamsProps) => {
  return <EditTask params={params} />;
};

export default TaskId;
