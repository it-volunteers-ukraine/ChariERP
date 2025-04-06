import { commentNormalizer } from '@/utils';
import { addCommentAction } from '@/actions';
import { showMessage } from '@/components/toastify';
import { ICommentResponse, ResponseGetType } from '@/types';

interface IOnAddComment {
  text: string;
  setComments: React.Dispatch<React.SetStateAction<ICommentResponse[]>>;
}

export const useAddComment = (taskId: string) => {
  const onAddComment = async ({ text, setComments }: IOnAddComment) => {
    try {
      const res: ResponseGetType = await addCommentAction({ taskId, text });

      if (res.success && res.data) {
        const parsedResponse = JSON.parse(res.data);

        const normalizeComment = commentNormalizer(parsedResponse);

        setComments((prev) => [...prev, normalizeComment]);

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
