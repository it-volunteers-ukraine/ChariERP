import { commentsNormalizer } from '@/utils';
import { deleteCommentAction } from '@/actions';
import { showMessage } from '@/components/toastify';
import { ICommentResponse, ResponseGetType } from '@/types';

interface IDeleteComment {
  taskId: string;
  setComments: React.Dispatch<React.SetStateAction<ICommentResponse[]>>;
}

export const useDeleteComment = ({ taskId, setComments }: IDeleteComment) => {
  const onDeleteComment = async (commentId: string) => {
    try {
      const res: ResponseGetType = await deleteCommentAction({ taskId, commentId });

      if (res.success && res.data) {
        const parsedResponse = JSON.parse(res.data);

        const normalizeComments = commentsNormalizer(parsedResponse);

        setComments(normalizeComments);

        return;
      }

      if (!res?.success && res?.message) {
        showMessage.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { onDeleteComment };
};
