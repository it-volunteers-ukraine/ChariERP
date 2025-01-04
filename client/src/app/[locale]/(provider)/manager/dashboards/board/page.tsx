import { redirect } from 'next/navigation';

import { routes } from '@/constants';

const Board = () => {
  return redirect(routes.managerDashboards);
};

export default Board;
