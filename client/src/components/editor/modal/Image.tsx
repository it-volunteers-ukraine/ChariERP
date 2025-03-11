'use client';

import { useState } from 'react';

import { Overlay } from '../../overlay';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
}

export const ImageModal = ({ isOpen, onClose, onInsert }: ImageModalProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleInsert = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onInsert(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else if (imageUrl) {
      onInsert(imageUrl);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay opened={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold">Додати зображення</h2>

          <input
            type="text"
            placeholder="Вставте URL зображення"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mb-2 w-full rounded border p-2"
          />

          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="rounded border p-2">
              Скасувати
            </button>
            <button onClick={handleInsert} className="rounded bg-blue-500 p-2 text-white">
              Додати
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};
