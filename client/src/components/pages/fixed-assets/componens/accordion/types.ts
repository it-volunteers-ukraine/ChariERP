export interface IAccordionProps {
  isOpen?: boolean;
  classNameTitle?: string;
  setVisible?: () => void;
  classNameWrapper?: string;
  children: string | React.ReactNode;
}

export interface IStylesAccordion {
  isOpen: boolean;
  classNameTitle?: string;
  classNameWrapper?: string;
}
