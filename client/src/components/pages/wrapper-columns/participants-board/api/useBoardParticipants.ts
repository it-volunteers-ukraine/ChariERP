'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import logger from '@/utils/logger/logger';

import { useUserInfo } from '@/context';
import { showMessage } from '@/components';
import { normalizeUsers, sortedUsers } from '@/utils';
import { ResponseGetType, StateProps, UserParticipants } from '@/types';
import { getBoardMembersAction, removeUserFromBoardAction } from '@/actions';

interface IDeleteUserFromBoard {
  deletedId: string;
  setAllParticipants: StateProps<UserParticipants[]>;
}

export const useBoardParticipants = ({ boardId, usersInTasks }: { boardId: string; usersInTasks: string[] }) => {
  const { _id } = useUserInfo();
  const boardText = useTranslations('board');

  const id = _id ? String(_id) : '';
  const [isLoading, setIsLoading] = useState(true);
  const [boardParticipants, setBoardParticipants] = useState<UserParticipants[]>([]);

  const getParticipants = async () => {
    try {
      setIsLoading(true);
      const response: ResponseGetType = await getBoardMembersAction({ userId: id, boardId });

      if (response && !response.success && response.message) {
        showMessage.error(response.message);
      }

      if (response && response?.success && response?.data) {
        const parsed = JSON.parse(response.data);

        const users = await normalizeUsers(parsed);

        setBoardParticipants(sortedUsers(users));
      }
    } catch (error) {
      logger.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserFromBoard = async ({ deletedId, setAllParticipants }: IDeleteUserFromBoard) => {
    try {
      const findUser = boardParticipants.find((user) => user.id === deletedId);

      if (!findUser) {
        return;
      }

      if (findUser.id === id) {
        showMessage.error(boardText('deleteYourSelf'));

        return;
      }

      if (usersInTasks.includes(findUser.id)) {
        showMessage.error(boardText('deleteCantUser'));

        return;
      }

      const response = await removeUserFromBoardAction({ userId: id, boardId, revokeUserId: deletedId });

      if (response && !response.success && response.message) {
        showMessage.error(response.message);
      }

      if (response && response?.success) {
        setBoardParticipants(boardParticipants.filter((user) => user.id !== deletedId));
        setAllParticipants((users) => sortedUsers([...users, findUser]));
      }
    } catch (error) {
      logger.error({ error });
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return { boardUsers: boardParticipants, setBoardParticipants, deleteUserFromBoard, isLoadingBoard: isLoading };
};
