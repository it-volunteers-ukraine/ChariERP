import { IUsersNormalizer } from '@/types';

export interface IDropdownListProps {
  dropdownClassName?: string;
  allUsers?: IUsersNormalizer[];
  setIsDropdownOpen: () => void;
  taskUsers?: IUsersNormalizer[];
  boardUsers?: IUsersNormalizer[];
  renderAllUsers?: (user: IUsersNormalizer, allIdx: number) => JSX.Element | undefined;
  renderTaskUsers?: (user: IUsersNormalizer, taskIdx: number) => JSX.Element | undefined;
  renderBoardUsers?: (user: IUsersNormalizer, boardIdx: number) => JSX.Element | undefined;
}
