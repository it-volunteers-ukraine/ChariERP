'use client';

import { useState } from 'react';

import { Img } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { ImageModal } from '../modal/Image';
import { INSERT_IMAGE_COMMAND } from '../node';

export const ImageButton = ({ className }: { className?: string }) => {
  const [editor] = useLexicalComposerContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const insertImage = (url: string) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
  };

  return (
    <>
      <button className={className} type="button" onClick={() => setIsModalOpen(true)}>
        <Img className="h-full" />
      </button>

      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onInsert={insertImage} />
    </>
  );
};
