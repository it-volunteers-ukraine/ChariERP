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
      <div className="flex flex-col justify-between w-full gap-4">
        <h1 className=" text-center uppercase text-scada font-bold text-[20px] leading-6 text-comet">{title}</h1>

        {content && isContentString && (
          <span className="text-roboto font-normal text-comet text-center">{content}</span>
        )}

        {content && !isContentString && content}

        <div className="flex gap-6 items-center justify-center pt-2 w-full">
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
