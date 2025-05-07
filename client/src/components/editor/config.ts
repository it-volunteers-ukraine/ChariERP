import { LinkNode } from '@lexical/link';
import { HeadingNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';

import { ImageNode } from './node';

const theme = {
  text: {
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    code: 'bg-[#f0f2f5] py-[1px] px-1 font-mono text-[94%]',
    strikethrough: 'line-through',
    subscript: 'align-sub',
    superscript: 'align-super',
  },
  list: {
    ol: 'p-0 m-0 pl-2 list-inside list-decimal',
    ul: 'p-0 m-0 pl-2 list-inside list-disc',
  },
  heading: {
    h1: 'text-[26px]',
    h2: 'text-[24px]',
    h3: 'text-[22px]',
    h4: 'text-[20px]',
    h5: 'text-[18px]',
  },
  link: 'text-blue-500 underline hover:text-blue-700',
};

interface IInitialConfig {
  isEditing: boolean;
  initialState?: string;
}

export const initialConfig = ({ initialState, isEditing = false }: IInitialConfig) => {
  return {
    theme,
    namespace: 'editor',
    editable: isEditing,
    editorState: initialState === '' ? undefined : initialState,
    nodes: [HeadingNode, ListNode, ListItemNode, ImageNode, LinkNode],
    onError: (e: Error) => {
      console.log('ERROR:', e);
    },
  };
};
