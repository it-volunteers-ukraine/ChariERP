import { Metadata } from 'next';

import AddMember from './add-member';

export const metadata: Metadata = {
  title: 'Add Member',
  description: 'Add Member',
};

const AddMemberPage = () => {
  return <AddMember />;
};

export default AddMemberPage;
