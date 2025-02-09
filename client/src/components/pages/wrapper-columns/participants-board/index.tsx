import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { AddUsers } from '@/assets/icons';
import { Participants, DropdownList, DropdownItem, DropdownInput, IntermediateText } from '@/components';

import { useAllParticipants, useBoardParticipants } from './api';

export const ParticipantsBoard = ({ boardId, usersInTasks }: { boardId: string; usersInTasks: string[] }) => {
  const { isManager } = useUserInfo();
  const boardText = useTranslations('board');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { boardUsers, deleteUserFromBoard, setBoardParticipants, isLoadingBoard } = useBoardParticipants({
    boardId,
    usersInTasks,
  });
  const { allUsers, addUserToBoard, setAllParticipants, isLoadingAllUsers } = useAllParticipants(boardId, boardUsers);

  const isLoading = !isLoadingBoard || !isLoadingAllUsers;

  return (
    <div className="relative flex items-center justify-between gap-6">
      <Participants users={boardUsers} width={40} />

      {isDropdownOpen && (
        <DropdownList
          allUsers={allUsers}
          boardUsers={boardUsers}
          setIsDropdownOpen={() => setIsDropdownOpen(false)}
          renderBoardUsers={(user, boardIdx) => (
            <div key={`board-user-${user.id}`}>
              {boardIdx === 0 && <IntermediateText text={boardText('currentBoard')} />}

              <DropdownItem
                lastName={user.lastName}
                firstName={user.firstName}
                avatarUrl={user.avatarUrl}
                checkbox={
                  <DropdownInput
                    checked
                    onChange={() => deleteUserFromBoard({ deletedId: user.id, setAllParticipants })}
                  />
                }
              />
            </div>
          )}
          renderAllUsers={(user, allIdx) => (
            <div key={`all-user-${user.id}`}>
              {allIdx === 0 && <IntermediateText text={boardText('allUsers')} />}

              <DropdownItem
                lastName={user.lastName}
                firstName={user.firstName}
                avatarUrl={user.avatarUrl}
                checkbox={
                  <DropdownInput
                    onChange={() => addUserToBoard({ applyUserId: user.id, setBoardUser: setBoardParticipants })}
                  />
                }
              />
            </div>
          )}
        />
      )}

      {isManager && isLoading && (
        <div className="flex cursor-pointer items-center gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <AddUsers />
          <span className="hidden text-base text-lightBlue tablet:inline desktop:hidden">{boardText('addUser')}</span>
        </div>
      )}
    </div>
  );
};
