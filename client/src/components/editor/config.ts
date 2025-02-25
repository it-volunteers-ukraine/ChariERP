import { HeadingNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { ImageNode } from './node';
import { createCommand } from 'lexical';

const theme = {
  text: {
    bold: 'text-bold',
    italic: 'text-italic',
    underline: 'text-underline',
    code: 'text-code',
    highlight: 'text-highlight',
    strikethrough: 'text-strikethrough',
    subscript: 'text-subscript',
    superscript: 'text-superscript',
  },
  list: {
    ol: 'ol',
    ul: 'ul',
  },
  heading: {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
  },
};

export const INSERT_IMAGE_COMMAND = createCommand<string>();

export const initialConfig = (initialState?: string, isEditing: boolean = false) => {
  return {
    namespace: 'editor',
    theme,
    editable: isEditing,
    editorState: initialState,
    nodes: [HeadingNode, ListNode, ListItemNode, ImageNode],
    onError: (e: Error) => {
      console.log('ERROR:', e);
    },
  };
};
