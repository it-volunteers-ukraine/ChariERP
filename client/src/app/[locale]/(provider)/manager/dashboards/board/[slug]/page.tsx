import { Metadata } from 'next';

import { BoardTaskCard } from '@/components';
import { mockCards } from '@/components/board-task-card/mock';

import { BoardTitle } from './board-title';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  return {
    title: `Dashboard - ${decodeURIComponent(slug)}`,
    description: `This is the dashboard page for ${decodeURIComponent(slug)}`,
  };
}

const DashboardSlug = ({ params }: Props) => {
  const titleContent =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nam praesentium error natus voluptatum eos, explicabo quis incidunt quae delectus illo eius facere necessitatibus molestiae ipsam perspiciatis repellat eligendi vitae?';

  return (
    <>
      <BoardTitle titleText={titleContent} />

      <BoardTaskCard cardData={mockCards} />

      {decodeURIComponent(params.slug)}
    </>
  );
};

export default DashboardSlug;
