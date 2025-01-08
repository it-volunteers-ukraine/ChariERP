import { Metadata } from 'next';

import { Columns } from '@/components';

import { BoardTitle } from './board-title';

interface Props {
  params: { board_id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board_id } = params;

  return {
    title: `Dashboard - ${board_id}`,
    description: `This is the dashboard page for ${board_id}`,
  };
}

const DashboardId = ({ params }: Props) => {
  const titleContent = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nam praesentium error natus voluptatum eos, explicabo quis incidunt quae delectus illo eius facere necessitatibus molestiae ipsam perspiciatis repellat eligendi vitae? ${params.board_id}`;

  return (
    <div className="relative flex h-[calc(100dvh-64px)] flex-col overflow-hidden bg-white desktop:h-[calc(100dvh-96px)]">
      <BoardTitle titleText={titleContent} />

      <Columns boardId={params.board_id} />
    </div>
  );
};

export default DashboardId;
