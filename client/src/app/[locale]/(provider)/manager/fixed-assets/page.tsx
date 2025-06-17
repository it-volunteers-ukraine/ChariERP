import { Metadata } from 'next';
import { FixedAssetsPage } from '@/components';

export const metadata: Metadata = {
  title: 'Fixed Assets',
  description: 'Fixed Assets page',
};

const FixedAssets = () => {
  return <FixedAssetsPage />;
};

export default FixedAssets;
