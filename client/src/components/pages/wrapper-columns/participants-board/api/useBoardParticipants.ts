'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { normalizeUsers } from '@/utils';
import { showMessage } from '@/components';
import { ResponseGetType, StateProps } from '@/types';
import { getBoardMembersAction, removeUserFromBoardAction } from '@/actions';

import { sortedUsers } from './helper';
import { UserParticipants } from './types';

interface IDeleteUserFromBoard {
  deletedId: string;
  setAllParticipants: StateProps<UserParticipants[]>;
}

export const useBoardParticipants = ({ boardId, usersInTasks }: { boardId: string; usersInTasks: string[] }) => {
  const { _id } = useUserInfo();
  const boardText = useTranslations('board');

  const [boardParticipants, setBoardParticipants] = useState<UserParticipants[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = _id ? String(_id) : '';

  const getParticipants = async () => {
    try {
      setIsLoading(true);
      const response: ResponseGetType = await getBoardMembersAction({ userId: id, boardId });

      if (response && !response.success && response.message) {
        showMessage.error(response.message);
      }

      if (response && response?.success && response?.data) {
        const parsed = JSON.parse(response.data);

        const users = normalizeUsers(parsed);

        setBoardParticipants(sortedUsers(users));
      }
    } catch (error) {
      console.log({ error });
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
      console.log({ error });
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return { boardUsers: boardParticipants, setBoardParticipants, deleteUserFromBoard, isLoadingBoard: isLoading };
};
