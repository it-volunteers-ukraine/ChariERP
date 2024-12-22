import { Task } from '@/components';

interface Props {
  params: { task_id: string; column_id: string; board_id: string };
}

const TaskPage = ({ params }: Props) => {
  return <Task params={{ ...params, task_id: 'create-task' }} />;
};

export default TaskPage;
