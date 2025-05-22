import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useUserInfo } from '@/context';
import { showMessage } from '@/components/toastify';
import { normalizeUsers, sortedUsers } from '@/utils';
import { ResponseGetType, UserParticipants } from '@/types';
import {
  addUserTaskAction,
  deleteUserTaskAction,
  getBoardMembersAction,
  getAllUsersByOrganizationIdActions,
} from '@/actions';

interface IUseParticipants {
  taskId: string;
  boardId: string;
  taskUsersList: UserParticipants[];
}

export const useParticipants = ({ taskId, taskUsersList, boardId }: IUseParticipants) => {
  const [allUsers, setAllUsers] = useState<UserParticipants[]>([]);
  const [boardUsers, setBoardUsers] = useState<UserParticipants[]>([]);
  const [taskUsers, setTaskUsers] = useState<UserParticipants[]>(sortedUsers(taskUsersList));

  const [isLoading, setIsLoading] = useState(false);
  const [idUserUpdatingStatus, setIdUserUpdatingStatus] = useState<string | null>(null);

  const taskText = useTranslations('taskPage.participants');

  const { _id, organizationId } = useUserInfo();
  const id = _id ? String(_id) : '';

  const getParticipants = async () => {
    try {
      setIsLoading(true);

      const responseBoardUsers: ResponseGetType = await getBoardMembersAction({ userId: id, boardId });
      let boardUsersNormalize = <UserParticipants[]>[];

      if (responseBoardUsers && responseBoardUsers?.success && responseBoardUsers?.data) {
        const parsed = JSON.parse(responseBoardUsers.data);

        boardUsersNormalize = await normalizeUsers(parsed);

        const boardUsersNotInTasks = boardUsersNormalize.filter(
          (user) => !taskUsers.find((taskUser) => taskUser.id === user.id),
        );

        setBoardUsers(sortedUsers(boardUsersNotInTasks));
      }

      const responseAllUsers = await getAllUsersByOrganizationIdActions({
        id: organizationId ? String(organizationId) : '',
        page: 1,
        limit: 200,
      });

      if (responseAllUsers && responseAllUsers?.success && responseAllUsers?.users) {
        const parsed = JSON.parse(responseAllUsers.users);

        const allUsersNormalize = await normalizeUsers(parsed.results);

        const allUsersNotInBoard = allUsersNormalize.filter(
          (user) => !boardUsersNormalize.find((boardUser) => boardUser.id === user.id),
        );

        setAllUsers(sortedUsers(allUsersNotInBoard));
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUser = async (userId: string) => {
    try {
      setIdUserUpdatingStatus(userId);

      const isExists = taskUsers.some((user) => user.id === userId);

      if (isExists) {
        showMessage.error(taskText('alreadyAdded'));

        return;
      }

      const res: ResponseGetType = await addUserTaskAction({ taskId, applyUserId: userId, boardId });

      if (!res.success && res.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }

      if (res.success) {
        const newUser = boardUsers.find((u) => u.id === userId) || allUsers.find((u) => u.id === userId);

        if (!newUser) {
          showMessage.error(taskText(''));

          return;
        }

        setTaskUsers((prev) => sortedUsers([...prev, newUser]));
        setBoardUsers((prev) => prev.filter((u) => u.id !== userId));
        setAllUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIdUserUpdatingStatus(null);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setIdUserUpdatingStatus(userId);

      if (userId === id) {
        showMessage.error(taskText('deleteYourSelf'));

        return;
      }

      const res: ResponseGetType = await deleteUserTaskAction({ taskId, deleteUserId: userId });

      if (!res.success && res.message) {
        showMessage.error(res.message);
        throw new Error(res.message);
      }

      if (res.success) {
        const deleteUser = taskUsers.find((u) => u.id === userId);

        if (deleteUser) {
          setTaskUsers((prev) => prev.filter((u) => u.id !== userId));
          setBoardUsers((prev) => sortedUsers([...prev, deleteUser]));
        }
      }
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIdUserUpdatingStatus(null);
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return {
    addUser,
    allUsers,
    taskUsers,
    isLoading,
    boardUsers,
    deleteUser,
    idUserUpdatingStatus,
  };
};
