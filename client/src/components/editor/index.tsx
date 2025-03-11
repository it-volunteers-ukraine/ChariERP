'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorState } from 'lexical';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';

import { Button } from '../button';
import { getStyle } from './style';
import { ToolBar } from './toolBar';
import { initialConfig } from './config';

import './index.css';
import { Color, Heading, ImagePlugin, OnChange, RestoreState, SetIsEditing, TreeViewPlugin } from './plugins';

interface IEditor {
  onSave: (state: string) => void;
  initialState?: string;
  isEditing?: boolean;
  cancelEditing?: () => void;
  className?: string;
}

export const Editor = ({ onSave, initialState, isEditing = false, cancelEditing, className }: IEditor) => {
  const [isOpen, setIsOpen] = useState(isEditing);
  const editorStateRef = useRef<EditorState | null>(null);

  useEffect(() => {
    setIsOpen(isEditing);
  }, [isEditing]);

  const handleSubmit = () => {
    if (editorStateRef.current) {
      onSave(JSON.stringify(editorStateRef.current.toJSON()));
    }
  };

  const handleClick = () => {
    if (!initialState) {
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);

    if (cancelEditing) {
      cancelEditing();
    }
  };

  const styles = getStyle(isOpen, className);

  return (
    <LexicalComposer initialConfig={initialConfig(initialState, initialState ? false : true)}>
      <ToolBar className={styles.toolBar} buttonClassName={styles.buttonToolBar} />
      <div className="relative">
        <RichTextPlugin
          contentEditable={<ContentEditable onClick={handleClick} className={styles.editor} />}
          placeholder={<p className={styles.placeholder}>Напишіть Ваш коментар</p>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      <div className={styles.wrapperButton}>
        <Button
          onClick={handleSubmit}
          className={styles.button}
          text="Зберегти"
          type="button"
          styleType="icon-primary"
        />
        <Button
          className={styles.button}
          text="Скасувати"
          type="button"
          styleType="outline-blue"
          onClick={handleCancel}
        />
      </div>

      <Color />
      <Heading />
      <ListPlugin />
      <ImagePlugin />
      <HistoryPlugin />
      <CheckListPlugin />

      <RestoreState isOpen={isOpen} initialState={initialState} />

      <OnChange
        onChange={(editorState) => {
          editorStateRef.current = editorState;
        }}
      />

      <SetIsEditing isEditing={initialState ? isOpen : true} />

      <TreeViewPlugin />
    </LexicalComposer>
  );
};
