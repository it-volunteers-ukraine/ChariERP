import { createContext, ReactNode, useContext, useState } from 'react';

import { showMessage } from '@/components';
import { commentsNormalizer } from '@/utils';
import { ICommentResponse, IUseUpdateComments, ResponseGetType } from '@/types';
import { addCommentAction, deleteCommentAction, updateCommentAction } from '@/actions';

interface CommentContextType {
  isPending: boolean;
  comments: ICommentResponse[];
  addComment: (text: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  updateComment: ({ text, commentId }: IUseUpdateComments) => Promise<void>;
}

interface CommentProviderProps {
  taskId: string;
  children: ReactNode;
  initialComments: ICommentResponse[];
}

const CommentsContext = createContext<CommentContextType | undefined>(undefined);

export const CommentsProvider = ({ children, initialComments, taskId }: CommentProviderProps) => {
  const [isPending, setIsPending] = useState(false);
  const [comments, setComments] = useState<ICommentResponse[]>(initialComments);

  const updateState = async (res: ResponseGetType) => {
    if (res.success && res.data) {
      const parsed = JSON.parse(res.data);

      setComments(await commentsNormalizer(parsed));
    } else if (!res.success && res.message) {
      showMessage.error(res.message);
    }
  };

  const addComment = async (text: string) => {
    setIsPending(true);
    try {
      const res = await addCommentAction({ taskId, text });

      updateState(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    setIsPending(true);
    try {
      const res = await deleteCommentAction({ taskId, commentId });

      updateState(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const updateComment = async ({ text, commentId }: IUseUpdateComments) => {
    setIsPending(true);
    try {
      const res = await updateCommentAction({ taskId, text, commentId });

      updateState(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CommentsContext.Provider value={{ comments, isPending, addComment, deleteComment, updateComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error('useCommentContext must be used within a CommentProvider');
  }

  return context;
};
