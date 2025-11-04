import { useState, useRef } from 'react';

import { Roles } from '@/types';
import { Loader } from '@/assets/icons';
import { useMounted, useOutsideClick } from '@/hooks';

import { selectStyles } from './styles';
import { CoreSelectProps } from './types';

export function CoreSelect<T>({
  options,
  selected,
  onChange,
  renderList,
  renderTrigger,
  classNameWrapper,
  isLoading = false,
  classNameDropList,
  userRole = Roles.MANAGER,
}: CoreSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(() => setIsOpen(false), [wrapperRef]);

  const { unmounted } = useMounted({ opened: isOpen, duration: 200 });

  const handleSelectClick = (userRole: string | undefined) => {
    if (userRole === Roles.MANAGER) {
      setIsOpen(!isOpen);
    }
  };

  const isManager = userRole === Roles.MANAGER;

  const style = selectStyles({
    isOpen,
    isLoading,
    isManager,
    classNameWrapper,
    classNameDropList,
  });

  return (
    <div className={style.wrapper}>
      {isLoading && (
        <div className="flex justify-center">
          <Loader className="w-6" />
        </div>
      )}

      {!isLoading && (
        <div ref={wrapperRef} onClick={() => handleSelectClick(userRole)}>
          {renderTrigger({ selected, isOpen, setIsOpen })}
        </div>
      )}

      {unmounted && (
        <div className={style.dropList} ref={wrapperRef}>
          {renderList({ selected, setIsOpen, options, onChange })}
        </div>
      )}
    </div>
  );
}
