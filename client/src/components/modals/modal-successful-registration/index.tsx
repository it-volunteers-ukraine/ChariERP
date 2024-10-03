import { Overlay, Button } from '@/components';

import { IModalAdminProps } from './types';

export const ModalSuccessfulRegistration = ({
  title,
  isOpen,
  content,
  onClose,
  navigate,
  onConfirm,
  isLoading,
  leftBtnText,
  classNameBtn,
  rightBtnText,
}: IModalAdminProps) => {
  const isContentString = typeof content === 'string';

  return (
    <Overlay opened={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col justify-between gap-4">
        <h1 className="text-scada text-center text-[20px] font-bold uppercase leading-6 text-comet">{title}</h1>

        {content && isContentString && (
          <span className="text-roboto text-center font-normal text-comet">{content}</span>
        )}

        {content && !isContentString && content}

        <div className="flex w-full items-center justify-center gap-6 pt-2">
          <Button
            type="submit"
            text={leftBtnText}
            styleType="primary"
            onClick={onConfirm}
            isLoading={isLoading}
            className={classNameBtn}
          />

          <Button styleType="outline-blue" className={classNameBtn} onClick={navigate} text={rightBtnText} />
        </div>
      </div>
    </Overlay>
  );
};
