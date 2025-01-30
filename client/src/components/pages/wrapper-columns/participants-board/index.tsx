import { useState } from 'react';

import { Participants } from '@/components';
import { AddUsers } from '@/assets/icons';

import { useParticipants } from './api';

export const ParticipantsBoard = ({ boardId }: { boardId: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { users } = useParticipants({ boardId });
  // const { addUsers } = useAddUser(boardId);

  console.log({ users });

  return (
    <div className="flex items-center gap-6">
      <Participants
        users={users}
        boardId={boardId}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      <AddUsers className="cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
    </div>
  );
};
