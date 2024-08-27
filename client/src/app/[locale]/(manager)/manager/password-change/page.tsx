import { Metadata } from 'next';

import { PasswordChange } from './password-change';

export const metadata: Metadata = {
  title: 'Password change',
  description: 'Password change page',
};

const PasswordChangePage = () => {
  return <PasswordChange />;
};

export default PasswordChangePage;
