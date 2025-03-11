import { useState } from 'react';
import { Overlay } from '@/components/overlay';

interface ILinkModal {
  isOpen: boolean;
  text?: string;
  url?: string;
  onClose: () => void;
  onSave: (text: string, url: string) => void;
}

export const LinkModal = ({ isOpen, text = '', url = '', onClose, onSave }: ILinkModal) => {
  const [linkText, setLinkText] = useState(text);
  const [linkUrl, setLinkUrl] = useState(url);

  return (
    <Overlay opened={isOpen} onClose={onClose} classNameModal="flex flex-col max-w-[450px]">
      <h2 className="mb-4 text-lg font-semibold">Додати посилання</h2>

      <input
        type="text"
        value={linkText}
        placeholder="Введіть текст"
        onChange={(e) => setLinkText(e.target.value)}
        className="mb-2 w-full rounded border p-2"
      />

      <input
        type="text"
        value={linkUrl}
        placeholder="Вставте URL"
        onChange={(e) => setLinkUrl(e.target.value)}
        className="mb-2 w-full rounded border p-2"
      />

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="rounded border p-2">
          Скасувати
        </button>
        <button
          onClick={() => {
            onSave(linkText, linkUrl);
            onClose();
          }}
          className="rounded bg-blue-500 p-2 text-white"
        >
          Додати
        </button>
      </div>
    </Overlay>
  );
};
