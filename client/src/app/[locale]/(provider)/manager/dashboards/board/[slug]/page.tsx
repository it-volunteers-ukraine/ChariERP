'use client';
import { useState } from 'react';
import { Metadata } from 'next';

import { TaskCard } from '@/components';
import { mockCards } from '@/components/task-card/mock';
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
  const [data, setData] = useState(mockCards);
  const titleContent =
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam nam praesentium error natus voluptatum eos, explicabo quis incidunt quae delectus illo eius facere necessitatibus molestiae ipsam perspiciatis repellat eligendi vitae?';

  return (
    <>
      <BoardTitle titleText={titleContent} />
      <TaskCard
        id={data[0].id}
        title={data[0].title}
        users={data[0].users}
        onDelete={(id) => setData((prev) => prev.filter((item) => item.id !== id))}
      />
      {decodeURIComponent(params.slug)}
    </>
  );
};

export default DashboardSlug;
