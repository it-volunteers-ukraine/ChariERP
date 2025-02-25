import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { useEffect } from 'react';

interface IDefaultState {
  isOpen: boolean;
  initialState?: string;
}

export const RestoreState = ({ isOpen, initialState }: IDefaultState) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!isOpen) {
      if (initialState) {
        editor.update(() => {
          editor.setEditorState(editor.parseEditorState(initialState));
        });
      } else {
        editor.update(() => {
          const root = $getRoot();

          root.clear();
        });
      }
    }
  }, [isOpen]);

  return null;
};
