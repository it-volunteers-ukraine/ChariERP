interface IStylesType {
  text: string;
  wrapper: string;
  wrapperCreate: string;
}

export interface ICreateCardProps {
  isEdit: boolean;
  sumBoards: number;
  styles: IStylesType;
  setIsEdit: (isEdit: boolean) => void;
}
