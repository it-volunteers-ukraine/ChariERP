import { useEffect, useState } from 'react';

import { showMessage } from '@/components';
import { getBoardMembersAction } from '@/actions';
import { useUserInfo } from '@/context';
import { ResponseGetType } from '@/types';
import { normalizeUsers } from '@/utils';
import { UserParticipants } from './types';

export const useParticipants = ({ boardId }: { boardId: string }) => {
  const { _id } = useUserInfo();
  const [participants, setParticipants] = useState<UserParticipants[]>([]);

  const id = _id ? String(_id) : '';

  const getParticipants = async () => {
    try {
      const response: ResponseGetType = await getBoardMembersAction({ userId: id, boardId });

      if (response && !response.success && response.message) {
        showMessage.error(response.message);
      }

      if (response && response?.success && response?.data) {
        const parsed = JSON.parse(response.data);

        const users = normalizeUsers(parsed);

        setParticipants(users);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return { users: participants };
};
