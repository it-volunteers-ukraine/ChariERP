import { useMounted } from '@/hooks';
import { Close } from '@/assets/icons';
import { ChildrenProps } from '@/types';

import { Portal } from '../portal';
import { getStyles } from './styles';

interface IOverlayProps {
  opened: boolean;
  duration?: number;
  onClose: () => void;
}

export const Overlay = ({
  opened,
  onClose,
  children,
  duration = 300,
}: ChildrenProps<IOverlayProps>) => {
  const { mounted } = useMounted({ opened, duration });

  const styles = getStyles(opened);

  if (!mounted) return null;

  return (
    <Portal opened={opened}>
      <div className="absolute inset-0 py-10 flex justify-center items-center w-screen h-screen z-10">
        <div
          onClick={onClose}
          className={styles.overlay}
          style={{ animationDuration: `${duration}ms` }}
        />
        <div
          className={styles.modal}
          style={{ animationDuration: `${duration - 20}ms` }}
        >
          <Close
            width={24}
            height={24}
            onClick={onClose}
            className={styles.svg}
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};
