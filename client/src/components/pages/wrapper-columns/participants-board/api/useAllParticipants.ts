import { useEffect, useState } from 'react';

import { StateProps } from '@/types';
import { useUserInfo } from '@/context';
import { normalizeUsers } from '@/utils';
import { showMessage } from '@/components';
import { applyUserToBoardAction, getAllUsersByOrganizationIdActions } from '@/actions';

import { sortedUsers } from './helper';
import { UserParticipants } from './types';

interface IAddUserToBoard {
  applyUserId: string;
  setBoardUser: StateProps<UserParticipants[]>;
}

export const useAllParticipants = (boardId: string, boardUsers: UserParticipants[]) => {
  const { _id, organizationId } = useUserInfo();
  const [participants, setAllParticipants] = useState<UserParticipants[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

        const allUsers = normalizeUsers(users.results);

        setAllParticipants(
          sortedUsers(allUsers.filter((user) => !boardUsers.find((boardUser) => boardUser.id === user.id))),
        );
      }
    } catch (error) {
      console.log({ error });
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
      console.log({ error });
    }
  };

  useEffect(() => {
    if (boardUsers.length > 0 && participants.length === 0) {
      getParticipants();
    }
  }, [boardUsers]);

  return { allUsers: participants, addUserToBoard, setAllParticipants, isLoadingAllUsers: isLoading };
};
