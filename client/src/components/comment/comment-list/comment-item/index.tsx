type TComment = {
  id: string;
  text: string;
  author: string;
  avatar: string;
  timestamp: number;
};

const CommentItem: React.FC<{ comment: TComment; onEdit: () => void; onDelete: () => void }> = ({
  comment,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow">
      <img src={comment.avatar} alt={comment.author} className="h-10 w-10 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{comment.author}</span>
          <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
        </div>
        <p className="mt-1 text-gray-700">{comment.text}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={onEdit} className="text-sm text-blue-500 hover:underline">
            Редагувати
          </button>
          <button onClick={onDelete} className="text-red-500 text-sm hover:underline">
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
