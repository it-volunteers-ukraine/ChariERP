import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { ArrowUp, Loader } from '@/assets/icons';
import { IUsersNormalizer, IUsersNormalizeResponse } from '@/types';
import { DropdownInput, Participants, DropdownItem, DropdownList, IntermediateText } from '@/components';

import { getStyle } from './styles';
import { useParticipants } from '../api';

interface IParticipantsTaskProps {
  taskId: string;
  boardId: string;
  isClosed?: boolean;
  taskUsersList: IUsersNormalizeResponse[];
}

export const ParticipantsTask = ({ taskId, boardId, taskUsersList, isClosed }: IParticipantsTaskProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const boardText = useTranslations('board');
  const taskText = useTranslations('taskPage');

  const { isManager } = useUserInfo();

  const { allUsers, boardUsers, taskUsers, isLoading, addUser, deleteUser, idUserUpdatingStatus } = useParticipants({
    taskId,
    boardId,
    taskUsersList,
  });

  const handleOpenMenu = () => {
    if (!isLoading) {
      setIsOpenMenu(!isOpenMenu);
    }
  };

  useEffect(() => {
    if (isClosed) {
      setIsOpenMenu(false);
    }
  }, [isClosed]);

  const styles = getStyle({ isOpenMenu, isLoading });

  const checkBoxRender = ({ userId, action, checked }: { userId: string; action: () => void; checked?: boolean }) => {
    if (idUserUpdatingStatus === userId) {
      return <Loader className={styles.loader} />;
    }

    return <DropdownInput checked={checked} onChange={action} />;
  };

  const renderUsersTaskManager = (user: IUsersNormalizer, taskIdx: number) => (
    <div key={`task-user-${user.id}`}>
      {taskIdx === 0 && <IntermediateText text={taskText('performers')} />}

      <DropdownItem
        lastName={user.lastName}
        firstName={user.firstName}
        avatarUrl={user.avatarUrl}
        checkbox={checkBoxRender({
          checked: true,
          userId: user.id,
          action: () => {
            deleteUser(user.id);
          },
        })}
      />
    </div>
  );

  const renderUsersTaskNotManager = (user: IUsersNormalizer) => (
    <div key={`board-user-${user.id}`}>
      <DropdownItem lastName={user.lastName} firstName={user.firstName} avatarUrl={user.avatarUrl} />
    </div>
  );

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
            allUsers={isManager ? allUsers : undefined}
            boardUsers={isManager ? boardUsers : undefined}
            dropdownClassName="w-full"
            taskUsers={taskUsers as IUsersNormalizer[]}
            setIsDropdownOpen={() => setIsOpenMenu(false)}
            renderTaskUsers={isManager ? renderUsersTaskManager : renderUsersTaskNotManager}
            renderBoardUsers={(user, boardIdx) => (
              <div key={`board-user-${user.id}`}>
                {boardIdx === 0 && <IntermediateText text={boardText('currentBoard')} />}

                <DropdownItem
                  lastName={user.lastName}
                  firstName={user.firstName}
                  avatarUrl={user.avatarUrl}
                  checkbox={checkBoxRender({
                    userId: user.id,
                    action: () => {
                      addUser(user.id);
                    },
                  })}
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
                  checkbox={checkBoxRender({
                    userId: user.id,
                    action: () => {
                      addUser(user.id);
                    },
                  })}
                />
              </div>
            )}
          />
        )}
      </div>
    </>
  );
};
