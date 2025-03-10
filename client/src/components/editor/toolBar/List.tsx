import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';

import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from '@lexical/list';
import { NumberList, TextList } from '@/assets/icons';

export const List = () => {
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
      <button
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
        onClick={() => formatList('bullet')}
      >
        <TextList className="h-full" />
      </button>
      <button
        className="flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]"
        onClick={() => formatList('number')}
      >
        <NumberList className="h-full" />
      </button>
    </>
  );
};
