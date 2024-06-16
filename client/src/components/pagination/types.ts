export interface IPagination {
  total: number;
  current: number;
  pageSize: number;
  className?: string;
  showTitle?: boolean;
  showLessItems?: boolean;
  onChange: (page: number) => void;
}
