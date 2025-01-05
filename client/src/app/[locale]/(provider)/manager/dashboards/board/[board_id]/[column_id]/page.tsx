import { redirect } from 'next/navigation';

import { routes } from '@/constants';

interface Props {
  params: { board_id: string };
}

const ColumnId = ({ params }: Props) => {
  return redirect(`${routes.managerDashboard}/${params.board_id}`);
};

export default ColumnId;
