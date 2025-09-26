import { useState } from 'react';

import { Overlay, Button } from '@/components';

import { Checkbox } from '../checkbox';

interface IModalExportProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onExportExcel?: () => void;
  onExportPdf?: () => Promise<void>;
}

const formats = [
  { id: 'pdf', label: 'PDF' },
  { id: 'excel', label: 'Excel' },
];

export const ModalExport = ({ title, isOpen, onClose, onExportPdf, onExportExcel }: IModalExportProps) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    if (!selectedFormat) return;

    setIsLoading(true);

    try {
      if (selectedFormat === 'pdf') {
        await onExportPdf?.();
      }

      if (selectedFormat === 'excel') {
        onExportExcel?.();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Overlay opened={isOpen} onClose={onClose} classNameModal="max-w-[400px]">
      <div className="flex w-full flex-col justify-between gap-2 break-words tablet:gap-6">
        <div className="flex w-full flex-col gap-4">
          <h1 className="text-center font-scada text-[20px] font-bold uppercase leading-6 text-mobster">{title}</h1>

          <div className="flex w-full flex-col gap-y-4 text-2xl">
            {formats.map((format) => (
              <Checkbox
                format={format}
                selectedFormat={selectedFormat}
                key={`${format.id}_${format.label}`}
                setSelectedFormat={setSelectedFormat}
              />
            ))}
          </div>
        </div>
        <Button
          type="button"
          text="ЗАВАНТАЖИТИ"
          onClick={handleExport}
          disabled={!selectedFormat || isLoading}
          className="m-auto w-[148px] rounded-2xl text-lg"
        />
      </div>
    </Overlay>
  );
};
