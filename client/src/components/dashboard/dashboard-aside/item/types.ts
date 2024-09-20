export interface INavItemProps {
  href: string;
  text: string;
  isOpen?: boolean;
  isParent?: boolean;
  disabled?: boolean;
  isChildren?: boolean;
  setIsOpen?: () => void;
  onCloseSideBar: () => void;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface INavItemStylesProps {
  isOpen?: boolean;
  isActive: boolean;
  disabled?: boolean;
  isChildren?: boolean;
}
