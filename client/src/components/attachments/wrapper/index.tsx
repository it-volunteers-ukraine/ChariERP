import { getStyles } from './styles';

interface ChildrenProps {
  className?: string;
  children: React.ReactNode;
}

export const Wrapper = ({ children, className }: ChildrenProps) => {
  const style = getStyles(className);

  return <div className={style.wrapper}>{children}</div>;
};
