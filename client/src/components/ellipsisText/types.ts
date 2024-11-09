export interface IEllipsisTextProps {
  delay?: number;
  margin?: number;
  className?: string;
  isShowAlways?: boolean;
  children: React.ReactNode;
  content: React.ReactNode | string;
}

export interface IGetStylesProps {
  className?: string | null;
  isEllipsisTooltip: boolean;
}
