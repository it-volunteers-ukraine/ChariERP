type TypeBtn = 'add' | 'delete' | 'changePass';

export interface ISmallBtn {
  text: string;
  type: TypeBtn;
  className?: string;
  onClick: () => void;
}
