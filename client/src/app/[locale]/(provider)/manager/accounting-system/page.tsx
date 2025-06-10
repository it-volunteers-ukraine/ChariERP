import { Metadata } from 'next';
import { AccountingSystemPage } from '@/components';

export const metadata: Metadata = {
  title: 'Accounting System',
  description: 'Accounting System page',
};

const AccountingSystem = () => {
  return <AccountingSystemPage />;
};

export default AccountingSystem;
