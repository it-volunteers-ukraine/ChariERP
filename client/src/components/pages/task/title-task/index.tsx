import { Copy, Delete, DotsSettings, Warning } from '@/assets/icons';
import { getStyles } from '../style';
import { useRef, useState } from 'react';
import { ToolsDropMenu } from '@/components/tools-drop-menu';
import { onCopy } from '@/utils';
import { useTranslations } from 'next-intl';

interface ITitleTask {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHandleBlur: () => void;
  error: string | null;
}

const duration = 300;

export const TitleTask = ({ title, onChange, onHandleBlur, error }: ITitleTask) => {
  const [isActive, setIsActive] = useState(false);
  const massageCopyTranslations = useTranslations('board');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const styles = getStyles();

  const handleDots = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActive(true);
  };

  const handlerDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsActive(false);
  };

  return (
    <div className="relative flex w-full gap-3">
      <textarea
        value={title}
        ref={textareaRef}
        onChange={onChange}
        placeholder={title}
        onBlur={() => onHandleBlur()}
        className="h-[62px] w-full resize-none bg-transparent font-scada text-[26px] font-bold uppercase leading-[28px] text-lightBlue focus:outline-none"
      />

      <>
        <button className="place-self-start rounded hover:bg-arcticSky" onClick={handleDots}>
          <DotsSettings />
        </button>

        <ToolsDropMenu
          animation="fade"
          opened={isActive}
          onClose={() => setIsActive(false)}
          duration={duration}
          className="bottom-0 right-0 h-fit"
        >
          <button
            className="flex min-w-10 cursor-pointer justify-between bg-transparent p-2 font-robotoCondensed text-base capitalize text-comet transition-all duration-300 hover:bg-arcticSky active:text-greenActive disabled:text-disabled"
            onClick={(e) => onCopy(e, `${window.location.href}`, massageCopyTranslations('massageCopyTitle'))}
          >
            <p>'copy'</p>
            <div className="h-6 w-6 scale-150 text-comet">
              <Copy />
            </div>
          </button>
          <button
            onClick={handlerDelete}
            className="flex justify-between rounded p-2 font-robotoCondensed text-base capitalize text-comet transition hover:bg-arcticSky"
          >
            <p>'delete'</p>
            <div className="h-6 w-6 text-comet">
              <Delete />
            </div>
          </button>
        </ToolsDropMenu>
      </>

      {error && (
        <div className={styles.wrapperError}>
          <Warning width={14} height={14} />

          <span className={styles.errorText}>{error}</span>
        </div>
      )}
    </div>
  );
};
