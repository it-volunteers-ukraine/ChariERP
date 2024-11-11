import { Metadata } from 'next';

import { Task } from '@/components';

interface Props {
  params: { idTask: string; idColumn: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { idTask } = params;

  return {
    title: `Task - ${idTask}`,
    description: `This is the task page for ${idTask}`,
  };
}

const TaskId = ({ params }: Props) => {
  return <Task params={params} />;
};

export default TaskId;
