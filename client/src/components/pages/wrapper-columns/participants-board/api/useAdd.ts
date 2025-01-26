import { applyUserToBoardAction } from '@/actions';

export const useAddUser = (boardId: string) => {
  const addUsers = async ({ userId, applyUserId }: { userId: string; applyUserId: string }) => {
    try {
      await applyUserToBoardAction({ userId, boardId, applyUserId });
    } catch (error) {
      console.log({ error });
    }
  };

  return { addUsers };
};
