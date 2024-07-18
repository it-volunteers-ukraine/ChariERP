export interface IAccordionProps {
  title: string;
  changedLength?: number;
  initialState?: boolean;
  classNameTitle?: string;
  classNameWrapper?: string;
  classNameChildren?: string;
  children: string | React.ReactNode;
}

export interface IStylesAccordion {
  isOpen: boolean;
  classNameTitle?: string;
  classNameWrapper?: string;
  classNameChildren?: string;
}
