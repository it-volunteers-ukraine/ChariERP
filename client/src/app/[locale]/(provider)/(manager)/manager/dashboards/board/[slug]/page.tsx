import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  return {
    title: `Dashboard - ${decodeURIComponent(slug)}`, // Устанавливаем заголовок страницы
    description: `This is the dashboard page for ${decodeURIComponent(slug)}`, // Динамическое описание
  };
}

const DashboardSlug = ({ params }: Props) => {
  return <>Dashboard Slug {decodeURIComponent(params.slug)}</>;
};

export default DashboardSlug;
