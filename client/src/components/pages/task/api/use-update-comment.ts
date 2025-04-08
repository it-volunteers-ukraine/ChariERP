import { commentsNormalizer } from '@/utils';
import { showMessage } from '@/components/toastify';
import { updateCommentAction } from '@/actions/tasks/update-comment';
import { IUseCommentProps, IUseUpdateComments, ResponseGetType } from '@/types';

export const useUpdateComment = ({ taskId, setComments }: IUseCommentProps) => {
  const onUpdateComment = async ({ text, commentId }: IUseUpdateComments) => {
    try {
      const res: ResponseGetType = await updateCommentAction({ taskId, commentId, text });

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

  return { onUpdateComment };
};
