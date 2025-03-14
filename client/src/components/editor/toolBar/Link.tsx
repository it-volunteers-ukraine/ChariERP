'use client';

import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getSelection, $isRangeSelection } from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { LinkModal } from '../modal';
import { LinkIcon } from '@/assets/icons';

export const Link = ({ className }: { className?: string }) => {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedUrl, setSelectedUrl] = useState<string>('');

  const openModal = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        let text = selection.getTextContent();
        const nodes = selection.getNodes();

        let linkUrl = '';

        nodes.forEach((node) => {
          const parentNode = node.getParent();

          if (parentNode && $isLinkNode(parentNode)) {
            linkUrl = parentNode.getURL();
            text = parentNode.getTextContent();
          }
        });

        setSelectedText(text);
        setSelectedUrl(linkUrl);
      } else {
        setSelectedText('');
        setSelectedUrl('');
      }

      setIsOpen(true);
    });
  };

  const insertLink = (text: string, url: string) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent();

        if (selectedText) {
          selection.insertText('');
        }

        const textNode = $createTextNode(text);

        selection.insertNodes([textNode]);

        editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, target: '_blank', rel: 'noopener noreferrer' });
      }
    });
  };

  return (
    <>
      <button className={className} onClick={openModal}>
        <LinkIcon className="w-full" />
      </button>
      {isOpen && (
        <LinkModal
          text={selectedText}
          url={selectedUrl}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={insertLink}
        />
      )}
    </>
  );
};
