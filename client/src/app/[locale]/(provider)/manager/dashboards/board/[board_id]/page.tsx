import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { routes } from '@/constants';
import { IBoardServerColumns } from '@/types';
import { WrapperColumns } from '@/components';
import { boardColumnsNormalizer } from '@/utils';
import { getBoardColumnsAction } from '@/actions';

interface Props {
  params: Promise<{ board_id: string }>;
}

export const getData = async (boardId: string) => {
  const cookiesStore = await cookies();
  const userId = cookiesStore.get('id')?.value || '';

  try {
    const response = await getBoardColumnsAction({
      userId,
      boardId,
    });

    if (!response.success || !response.data) {
      throw new Error(response.message);
    }

    const parsedResponse = JSON.parse(response.data as string);

    return parsedResponse as IBoardServerColumns;
  } catch (e) {
    console.log({ e });

    return Promise.reject(e);
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board_id } = await params;

  let title = '';
  let order = '';

  const response = await getData(board_id);

  if (response) {
    title = response.title || '';
    order = String(response.order || '');
  }

  return {
    title: title ? `Dashboard - #${order} ${title}` : 'Dashboard',
    description: title ? `This is the dashboard page for #${order} ${title}` : 'This is the dashboard page.',
  };
}

const DashboardId = async ({ params }: Props) => {
  const { board_id } = await params;

  const handelGetData = async () => {
    try {
      const data = await getData(board_id);

      return data;
    } catch {
      redirect(routes.managerDashboardDenied);
    }
  };
  const data = await handelGetData();

  const columns = boardColumnsNormalizer(data?.boardColumns);

  return <WrapperColumns id={board_id} columns={columns} title={`#${data.order} ${data.title}`} />;
};

export default DashboardId;
