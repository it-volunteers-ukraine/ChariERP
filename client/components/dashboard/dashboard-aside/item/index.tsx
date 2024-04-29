import { useRouter, usePathname } from 'next/navigation';

import { getStyles } from './styles';
import { INavItemProps } from './types';

export const NavItem = ({
  Icon,
  text,
  href,
  className,
  ...props
}: INavItemProps) => {
  const router = useRouter();
  const path = usePathname();

  const isActive = path.includes(href);

  const { wrapper, icon, span } = getStyles({
    isActive,
    className,
    disabled: props.disabled,
  });

  const goTo = () => {
    if (isActive) {
      return;
    }
    router.push(href);
  };

  return (
    <button onClick={goTo} className={wrapper} {...props}>
      <Icon className={icon} />

      <span className={span}>{text}</span>
    </button>
  );
};
