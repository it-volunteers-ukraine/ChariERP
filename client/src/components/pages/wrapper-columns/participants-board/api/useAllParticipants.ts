import { useEffect, useState } from 'react';
import logger from '@/utils/logger/logger';

import { useUserInfo } from '@/context';
import { showMessage } from '@/components';
import { normalizeUsers, sortedUsers } from '@/utils';
import { StateProps, UserParticipants } from '@/types';
import { applyUserToBoardAction, getAllUsersByOrganizationIdActions } from '@/actions';

interface IAddUserToBoard {
  applyUserId: string;
  setBoardUser: StateProps<UserParticipants[]>;
}

export const useAllParticipants = (boardId: string, boardUsers: UserParticipants[]) => {
  const { _id, organizationId } = useUserInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [participants, setAllParticipants] = useState<UserParticipants[]>([]);

  const getParticipants = async () => {
    try {
      setIsLoading(true);
      const response = await getAllUsersByOrganizationIdActions({
        id: organizationId ? String(organizationId) : '',
        page: 1,
        limit: 200,
      });

      if (response && response?.success && response?.users) {
        const users = JSON.parse(response.users);

        const allUsers = await normalizeUsers(users.results);

        const usersByBoard = allUsers.filter((user) => !boardUsers.find((boardUser) => boardUser.id === user.id));

        setAllParticipants(sortedUsers(usersByBoard));
      }
    } catch (error) {
      logger.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const addUserToBoard = async ({ applyUserId, setBoardUser }: IAddUserToBoard) => {
    const id = _id ? String(_id) : '';

    try {
      const findUser = participants.find((user) => user.id === applyUserId);

      if (!findUser) {
        return;
      }

      const response = await applyUserToBoardAction({ userId: id, boardId, applyUserId });

      if (response && !response.success && response.message) {
        showMessage.error(response.message);
      }

      if (response && response?.success) {
        setAllParticipants(participants.filter((user) => user.id !== applyUserId));
        setBoardUser((users) => sortedUsers([...users, findUser]));
      }
    } catch (error) {
      logger.error({ error });
    }
  };

  useEffect(() => {
    if (boardUsers.length > 0 && participants.length === 0) {
      getParticipants();
    }
  }, [boardUsers]);

  return { allUsers: participants, addUserToBoard, setAllParticipants, isLoadingAllUsers: isLoading };
};
