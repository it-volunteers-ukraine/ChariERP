import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { ArrowUp, Loader } from '@/assets/icons';
import { IUsersNormalizer, IUsersNormalizeResponse } from '@/types';
import { DropdownInput, Participants, DropdownItem, DropdownList, IntermediateText } from '@/components';

import { getStyle } from './styles';
import { useParticipants } from '../api';

interface IParticipantsTaskProps {
  taskId: string;
  boardId: string;
  taskUsersList: IUsersNormalizeResponse[];
}

export const ParticipantsTask = ({ taskId, boardId, taskUsersList }: IParticipantsTaskProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const boardText = useTranslations('board');
  const taskText = useTranslations('taskPage');

  const { allUsers, boardUsers, taskUsers, isLoading, addUser, deleteUser } = useParticipants({
    taskId,
    boardId,
    taskUsersList,
  });

  const handleOpenMenu = () => {
    if (!isLoading) {
      setIsOpenMenu(!isOpenMenu);
    }
  };

  const styles = getStyle(isOpenMenu);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.button} onClick={handleOpenMenu}>
          <Participants users={taskUsers} isTask />
          {!isLoading && <ArrowUp className={styles.arrow} />}
          {isLoading && <Loader className={styles.loader} />}
        </div>

        {isOpenMenu && !isLoading && (
          <DropdownList
            allUsers={allUsers}
            boardUsers={boardUsers}
            taskUsers={taskUsers as IUsersNormalizer[]}
            setIsDropdownOpen={() => setIsOpenMenu(false)}
            renderTaskUsers={(user, taskIdx) => (
              <div key={`task-user-${user.id}`}>
                {taskIdx === 0 && <IntermediateText text={taskText('performers')} />}

                <DropdownItem
                  lastName={user.lastName}
                  firstName={user.firstName}
                  avatarUrl={user.avatarUrl}
                  checkbox={<DropdownInput checked onChange={() => deleteUser(user.id)} />}
                />
              </div>
            )}
            renderBoardUsers={(user, boardIdx) => (
              <div key={`board-user-${user.id}`}>
                {boardIdx === 0 && <IntermediateText text={boardText('currentBoard')} />}

                <DropdownItem
                  lastName={user.lastName}
                  firstName={user.firstName}
                  avatarUrl={user.avatarUrl}
                  checkbox={<DropdownInput onChange={() => addUser(user.id)} />}
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
                  checkbox={<DropdownInput onChange={() => addUser(user.id)} />}
                />
              </div>
            )}
          />
        )}
      </div>
    </>
  );
};
