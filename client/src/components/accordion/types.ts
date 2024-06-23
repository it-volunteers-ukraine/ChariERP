export interface IAccordionProps {
  title: string;
  initialState?: boolean;
  classNameTitle?: string;
  classNameWrapper?: string;
  classNameChildren?: string;
  children: string | React.ReactNode;
}

export interface IStylesAccordion {
  isOpen: boolean;
  classNameWrapper?: string;
  classNameChildren?: string;
}
