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
import { Color, FontSize, Heading, ImagePlugin, OnChange, RestoreState, SetIsEditing } from './plugins';

import './index.css';

interface IEditor {
  isEditing: boolean;
  className?: string;
  onOpen?: () => void;
  placeholder?: string;
  classNamePlaceholder?: string;
  initialState?: string | undefined;
  onSave: (state: string | null) => void;
}

export const Editor = ({
  onSave,
  onOpen,
  className,
  initialState,
  placeholder = '',
  isEditing = false,
  classNamePlaceholder,
}: IEditor) => {
  const styles = getStyle({ isClick: !isEditing && !!onOpen, className, classNamePlaceholder });

  const handleClick = () => {
    if (onOpen && !isEditing) {
      onOpen();
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig(initialState, !initialState)}>
      <ToolBar isEditing={isEditing} />
      <div className="relative">
        <RichTextPlugin
          contentEditable={<ContentEditable onClick={handleClick} className={styles.editor} />}
          placeholder={<p className={styles.placeholder}>{placeholder}</p>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      <Color />
      <Heading />
      <FontSize />
      <LinkPlugin />
      <ListPlugin />
      <ImagePlugin />
      <HistoryPlugin />
      <CheckListPlugin />

      <RestoreState isOpen={isEditing} initialState={initialState} />

      <OnChange
        isEditing={isEditing}
        onChange={(editorState) => {
          onSave(editorState);
        }}
      />

      <SetIsEditing isEditing={isEditing} />
    </LexicalComposer>
  );
};
