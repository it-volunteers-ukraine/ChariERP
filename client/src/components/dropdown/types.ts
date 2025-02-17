import { IUsersNormalizer } from '@/types';

export interface IDropdownListProps {
  dropdownClassName?: string;
  allUsers?: IUsersNormalizer[];
  setIsDropdownOpen: () => void;
  taskUsers?: IUsersNormalizer[];
  boardUsers?: IUsersNormalizer[];
  renderAllUsers?: (user: IUsersNormalizer, allIdx: number) => React.ReactNode | undefined;
  renderTaskUsers?: (user: IUsersNormalizer, taskIdx: number) => React.ReactNode | undefined;
  renderBoardUsers?: (user: IUsersNormalizer, boardIdx: number) => React.ReactNode | undefined;
}
