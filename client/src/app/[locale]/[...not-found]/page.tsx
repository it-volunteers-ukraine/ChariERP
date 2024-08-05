import { Metadata } from 'next';

import NotFound from './not-found';

export const metadata: Metadata = {
  title: '404',
  description: '404 page',
};

export default function Page() {
  return <NotFound />;
}
