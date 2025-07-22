import { Overlay, Button } from '@/components';

interface IModalExportProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  classNameBtn?: string;
  onExportPdf?: () => void;
  onExportExcel?: () => void;
}

export const ModalExport = ({
  title,
  isOpen,
  onClose,
  onExportPdf,
  classNameBtn,
  onExportExcel,
}: IModalExportProps) => {
  return (
    <Overlay opened={isOpen} onClose={onClose} classNameModal="max-w-[400px]">
      <div className="flex w-full flex-col justify-between gap-2 break-words tablet:gap-4">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-center font-scada text-[20px] font-bold uppercase leading-6 text-mobster">{title}</h1>

          <div className="flex w-full items-center justify-center gap-6 pt-2 text-2xl">
            <Button text="PDF" type="button" onClick={onExportPdf} styleType="icon-primary" className={classNameBtn} />

            <Button
              text="EXCEL"
              type="button"
              onClick={onExportExcel}
              styleType="icon-primary"
              className={classNameBtn}
            />
          </div>
        </div>
      </div>
    </Overlay>
  );
};
