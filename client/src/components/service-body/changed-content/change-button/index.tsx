import { SVGProps } from 'react';

import { getStyle } from './style';

interface IChangeButtonProps {
  id: number;
  name: string;
  isActive: boolean;
  setActive: (id: number) => void;
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const ChangeButton = ({ Icon, name, id, setActive, isActive }: IChangeButtonProps) => {
  const style = getStyle(isActive);

  return (
    <button onClick={() => setActive(id)} className={style.btn}>
      <div className={style.absoluteElement} />

      <div className="h-6 w-6 tablet:h-8 tablet:w-8">
        <Icon className={style.icon} />
      </div>

      <h3 className={style.nameBtn}>{name}</h3>
    </button>
  );
};
