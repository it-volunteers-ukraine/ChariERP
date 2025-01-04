interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

interface ITask {
  id: string;
  title: string;
  users: IUser[];
}

export interface IBoardColumn {
  id: string;
  title: string;
  tasks: ITask[];
}

export interface IUseStateBoardColumns {
  response: IBoardColumn[];
  setColumns: React.Dispatch<React.SetStateAction<IBoardColumn[]>>;
}

export interface IUseStateBoardColumn {
  response: IBoardColumn;
  setColumn: React.Dispatch<React.SetStateAction<IBoardColumn>>;
}
