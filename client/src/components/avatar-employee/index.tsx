import { AvatarProps } from './types';

export const AvatarEmployee = ({ src, name, width, surname }: AvatarProps) => {
  const isWidth = width ? `w-[${width}]` : 'w-[86px]';

  return (
    <div
      className={`${isWidth} flex rounded-full items-center justify-center aspect-square overflow-hidden bg-superBlue`}
    >
      {src && <img loading="lazy" src={src} alt={`${surname} ${name}`} className="w-full h-full" />}

      {!src && <p className="uppercase text-dark-blue text-[36px] font-scada">{name[0] + surname[0]}</p>}
    </div>
  );
};
