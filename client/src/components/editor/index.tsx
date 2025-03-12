'use client';

import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import { getStyle } from './style';
import { ToolBar } from './toolBar';
import { initialConfig } from './config';

import './index.css';
import { Color, Heading, ImagePlugin, OnChange, RestoreState, SetIsEditing } from './plugins';

interface IEditor {
  isEditing: boolean;
  className?: string;
  onOpen?: () => void;
  placeholder?: string;
  initialState?: string;
  onSave: (state: string) => void;
}

export const Editor = ({ onSave, initialState, onOpen, isEditing = false, className, placeholder = '' }: IEditor) => {
  const styles = getStyle(isEditing, className);

  const handleClick = () => {
    if (onOpen && !isEditing) {
      onOpen();
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig(initialState, initialState ? false : true)}>
      <ToolBar className={styles.toolBar} buttonClassName={styles.buttonToolBar} />
      <div className="relative">
        <RichTextPlugin
          contentEditable={<ContentEditable onClick={handleClick} className={styles.editor} />}
          placeholder={<p className={styles.placeholder}>{placeholder}</p>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      <Color />
      <Heading />
      <ListPlugin />
      <ImagePlugin />
      <HistoryPlugin />
      <CheckListPlugin />
      <LinkPlugin />

      <RestoreState isOpen={isEditing} initialState={initialState} />

      <OnChange
        onChange={(editorState) => {
          onSave(JSON.stringify(editorState.toJSON()));
        }}
      />

      <SetIsEditing isEditing={initialState ? isEditing : true} />
    </LexicalComposer>
  );
};
