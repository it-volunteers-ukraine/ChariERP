export interface IEllipsisTextProps {
  delay?: number;
  margin?: number;
  isShowAlways?: boolean;
  children: React.ReactNode;
  classNameWrapper?: string;
  content: React.ReactNode | string;
}

export interface IGetStylesProps {
  isEllipsisTooltip: boolean;
  classNameWrapper?: string | null;
}
