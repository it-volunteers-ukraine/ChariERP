export interface INavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  text: string;
  className?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface INavItemStylesProps {
  isActive: boolean;
  disabled?: boolean;
  className?: string;
}
