export interface IEllipsisTextProps {
  delay?: number;
  margin?: number;
  isShowAlways?: boolean;
  children: React.ReactNode;
  className?: string;
  content: React.ReactNode | string;
}

export interface IGetStylesProps {
  isEllipsisTooltip: boolean;
  className?: string | null;
}
