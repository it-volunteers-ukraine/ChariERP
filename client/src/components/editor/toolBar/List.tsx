'use client';

import { useState } from 'react';

import { NumberList, TextList } from '@/assets/icons';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';

export const List = ({ className }: { className?: string }) => {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');

  const formatList = (listType: string) => {
    if (listType === 'number' && blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setBlockType('number');
    } else if (listType === 'bullet' && blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setBlockType('bullet');
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setBlockType('paragraph');
    }
  };

  return (
    <>
      <button className={className} onClick={() => formatList('bullet')}>
        <TextList className="h-full" />
      </button>
      <button className={className} onClick={() => formatList('number')}>
        <NumberList className="h-full" />
      </button>
    </>
  );
};
