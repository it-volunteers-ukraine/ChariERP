export interface IAccordionProps {
  title: string;
  initialState?: boolean;
  classNameTitle?: string;
  icon?: React.ElementType;
  classNameWrapper?: string;
  children: string | React.ReactNode;
}

export interface IStylesAccordion {
  isOpen: boolean;
  classNameTitle?: string;
  classNameWrapper?: string;
}
