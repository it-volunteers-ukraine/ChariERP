export type RenderTriggerProps<T> = {
  selected: T | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RenderListProps<T> = {
  selected: T | null;
  options: T[];
  onChange: (v: T) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CoreSelectProps<T> = {
  selected: T | null;
  options: T[];
  userRole?: string;
  isLoading?: boolean;
  onChange: (v: T) => void;
  classNameDropList?: string;
  classNameWrapper?: string;
  renderTrigger: (props: RenderTriggerProps<T>) => React.ReactNode;
  renderList: (props: RenderListProps<T>) => React.ReactNode;
};
