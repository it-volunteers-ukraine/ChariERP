import CommentItem from './comment-item';

type Comment = {
  id: string;
  text: string;
  author: string;
  avatar: string;
  timestamp: number;
};

const CommentsList: React.FC<{
  comments: Comment[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ comments, onEdit, onDelete }) => {
  return (
    <div className="mt-4 rounded-lg bg-gray-100 p-4">
      <h2 className="mb-2 text-lg font-semibold">Коментарі</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">Ще немає коментарів</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onEdit={() => onEdit(comment.id)}
              onDelete={() => onDelete(comment.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsList;
