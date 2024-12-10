export interface IAccordionProps {
  title: string;
  isOpen: boolean;
  disabled?: boolean;
  description: string;
  onClick: () => void;
}

export interface IStylesProps {
  isOpen: boolean;
  disabled?: boolean;
}
