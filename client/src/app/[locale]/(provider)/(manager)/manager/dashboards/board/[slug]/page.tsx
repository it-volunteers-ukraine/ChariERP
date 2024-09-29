import { Metadata } from 'next';

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
  return <>Dashboard Slug {decodeURIComponent(params.slug)}</>;
};

export default DashboardSlug;
