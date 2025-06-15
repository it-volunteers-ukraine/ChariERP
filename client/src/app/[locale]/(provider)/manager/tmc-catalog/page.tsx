import { Metadata } from 'next';
import { TmcCatalogPage } from '@/components';

export const metadata: Metadata = {
  title: 'TMC Catalog',
  description: 'TMC Catalog page',
};

const TmcCatalog = () => {
  return <TmcCatalogPage />;
};

export default TmcCatalog;
