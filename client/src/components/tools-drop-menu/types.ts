type Animation = 'horizontal' | 'fade';

export interface IGetStyleProps {
  opened: boolean;
  className?: string;
  animation?: Animation;
}

export interface IToolsDropMenuProps {
  opened: boolean;
  duration?: number;
  className?: string;
  onClose: () => void;
  animation?: Animation;
}
