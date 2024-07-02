import { Button } from '../button';
import { Overlay } from '../overlay';
import { IModalAdminProps } from './types';

export const ModalAdmin = ({
  title,
  isOpen,
  content,
  onClose,
  subtitle,
  onConfirm,
  btnCancelText,
  btnConfirmText,
}: IModalAdminProps) => {
  const isContentString = typeof content === 'string';

  return (
    <Overlay opened={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-between w-full gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h1 className=" text-center uppercase text-scada text-2xl font-bold text-xl leading-6 text-mobster">
            {title}
          </h1>

          {subtitle && <h2 className="text-roboto font-normal text-dimGray text-center">{subtitle}</h2>}
        </div>

        {content && isContentString && (
          <span className="text-roboto font-normal text-dimGray text-center">{content}</span>
        )}

        {content && !isContentString && content}

        <div className="flex gap-6 items-center justify-center pt-2 w-full">
          <Button styleType="green" onClick={onConfirm} text={btnConfirmText} />

          <Button styleType="red" onClick={onClose} text={btnCancelText} />
        </div>
      </div>
    </Overlay>
  );
};
