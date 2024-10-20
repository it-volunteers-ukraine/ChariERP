import { Metadata } from 'next';

import { BoardTitle } from './board-title';

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
  const titleContent =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nam praesentium error natus voluptatum eos, explicabo quis incidunt quae delectus illo eius facere necessitatibus molestiae ipsam perspiciatis repellat eligendi vitae?';

  return (
    <>
      <BoardTitle titleText={titleContent} />

      {params.id}
    </>
  );
};

export default DashboardId;
