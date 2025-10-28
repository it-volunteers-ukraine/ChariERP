export type RenderTriggerProps<T> = {
  isOpen: boolean;
  selected: T | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RenderListProps<T> = {
  options: T[];
  selected: T | null;
  onChange: (v: T) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CoreSelectProps<T> = {
  options: T[];
  userRole?: string;
  selected: T | null;
  isLoading?: boolean;
  onChange: (v: T) => void;
  classNameWrapper?: string;
  classNameDropList?: string;
  renderList: (props: RenderListProps<T>) => React.ReactNode;
  renderTrigger: (props: RenderTriggerProps<T>) => React.ReactNode;
};
