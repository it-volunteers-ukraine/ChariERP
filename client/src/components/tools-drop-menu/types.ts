type AnimationStart = 'openToolsMenu' | 'startExpand';

type AnimationEnd = 'closeToolsMenu' | 'startCollapse';

export interface IGetStyleProps {
  opened: boolean;
  className?: string;
  animationEnd?: AnimationEnd;
  animationStart?: AnimationStart;
}

export interface IToolsDropMenuProps {
  opened: boolean;
  duration?: number;
  className?: string;
  onClose: () => void;
  animationEnd?: AnimationEnd;
  animationStart?: AnimationStart;
}
