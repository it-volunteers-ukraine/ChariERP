import { Overlay, Button } from '@/components';

import { IModalAdminProps } from './types';

export const ModalAdmin = ({
  title,
  isOpen,
  isError,
  content,
  onClose,
  subtitle,
  onConfirm,
  isLoading,
  classNameBtn,
  btnCancelText,
  btnConfirmText,
}: IModalAdminProps) => {
  const isContentString = typeof content === 'string';

  return (
    <Overlay opened={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col justify-between gap-2 break-words tablet:gap-4">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-center font-scada text-[20px] font-bold uppercase leading-6 text-mobster">{title}</h1>

          {subtitle && <h2 className="text-roboto text-center font-normal text-dimGray">{subtitle}</h2>}
        </div>

        {content && isContentString && (
          <span className="text-roboto text-center font-normal text-dimGray">{content}</span>
        )}

        {content && !isContentString && content}

        <div className="flex w-full items-center justify-center gap-6 pt-2">
          <Button
            type="submit"
            styleType="green"
            disabled={isError}
            onClick={onConfirm}
            text={btnConfirmText}
            isLoading={isLoading}
            className={classNameBtn}
          />

          <Button styleType="red" type="button" onClick={onClose} text={btnCancelText} className={classNameBtn} />
        </div>
      </div>
    </Overlay>
  );
};
