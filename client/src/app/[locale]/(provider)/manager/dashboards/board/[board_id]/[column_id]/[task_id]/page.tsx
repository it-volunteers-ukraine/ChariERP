import { Metadata } from 'next';

interface Props {
  params: { task_id: string; column_id: string; board_id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { task_id } = params;

  return {
    title: `Task - ${task_id}`,
    description: `This is the task page for ${task_id}`,
  };
}

const TaskId = ({ params }: Props) => {
  return <div>TaskId: {params.task_id}</div>;
};

export default TaskId;
