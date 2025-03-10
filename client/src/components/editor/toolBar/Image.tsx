import { Img } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';
import { ImageModal } from '../Modal';
import { INSERT_IMAGE_COMMAND } from '../node';

export const ImageButton = () => {
  const [editor] = useLexicalComposerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const insertImage = (url: string) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
  };

  return (
    <>
      <button
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        <Img className="h-full" />
      </button>

      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onInsert={insertImage} />
    </>
  );
};
