import { redirect } from 'next/navigation';

import { routes } from '@/constants';

interface Props {
  params: Promise<{ board_id: string }>;
}

const ColumnId = async ({ params }: Props) => {
  const { board_id } = await params

  return redirect(`${routes.managerDashboard}/${board_id}`);
};

export default ColumnId;
