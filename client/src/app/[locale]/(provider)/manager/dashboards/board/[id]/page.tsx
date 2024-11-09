import { Metadata } from 'next';

import { BoardTitle } from './board-title';
import { Columns } from '@/components/columns';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  return {
    title: `Dashboard - ${id}`,
    description: `This is the dashboard page for ${id}`,
  };
}

const DashboardId = ({ params }: Props) => {
  const titleContent = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nam praesentium error natus voluptatum eos, explicabo quis incidunt quae delectus illo eius facere necessitatibus molestiae ipsam perspiciatis repellat eligendi vitae? ${params.id}`;

  return (
    <div className="relative flex h-[calc(100dvh-64px)] flex-col overflow-hidden desktop:h-[calc(100dvh-96px)]">
      <BoardTitle titleText={titleContent} />

      <Columns />
    </div>
  );
};

export default DashboardId;
