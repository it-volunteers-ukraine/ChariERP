import { commentsNormalizer } from '@/utils';
import { addCommentAction } from '@/actions';
import { showMessage } from '@/components/toastify';
import { ICommentResponse, ResponseGetType } from '@/types';

interface IAddComment {
  taskId: string;
  setComments: React.Dispatch<React.SetStateAction<ICommentResponse[]>>;
}

export const useAddComment = ({ taskId, setComments }: IAddComment) => {
  const onAddComment = async (text: string) => {
    try {
      const res: ResponseGetType = await addCommentAction({ taskId, text });

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

  return { onAddComment };
};
