import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { changedMock } from './mock';
import { ChangeButton } from './change-button';

export const ChangedContent = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const buttonName = useTranslations(`aboutService.sidebarButtonName`);

  const handleClick = (id: number) => {
    setActiveId(id);
  };

  return (
    <div className="flex flex-col gap-y-8 laptop:gap-y-10 desktop:flex-row desktop:gap-9 desktopXl:gap-8">
      <div className="flex w-full flex-col gap-4 laptop:flex-row laptop:justify-between desktop:w-[264px] desktop:flex-col desktop:justify-normal desktop:gap-6">
        {changedMock.map(({ Icon, id, name }, idx) => (
          <ChangeButton
            id={id}
            Icon={Icon}
            key={`${name}_${idx}`}
            name={buttonName(name)}
            setActive={handleClick}
            isActive={activeId === id}
          />
        ))}
      </div>

      <div>
        {changedMock.map(({ content, name, id }, idx) => (
          <div className="flex flex-col gap-y-4 desktop:gap-y-8 desktopXl:gap-y-10" key={`${name}_${idx}`}>
            {activeId === id && content.map(({ img }, idx) => <Image key={idx} src={img} alt={name} />)}
          </div>
        ))}
      </div>
    </div>
  );
};
