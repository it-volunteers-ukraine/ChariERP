export interface IEllipsisTextProps {
  isMultiline?: boolean;
  widthToolTip?: number;
  marginTooltip?: number;
  children: React.ReactNode;
  classNameWrapper?: string | null;
  classNameTooltipText?: string | null;
  classNameTooltipWrapper?: string | null;
}

export interface IGetStylesProps {
  isEllipsisTooltip: boolean;
  classNameTooltipText?: string | null;
  classNameTooltipWrapper?: string | null;
}
