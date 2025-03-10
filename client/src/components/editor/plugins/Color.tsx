import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { CHANGE_COLOR_COMMAND, ColorNode } from '../node/color';
import { $getSelection, $insertNodes, $isRangeSelection, TextNode } from 'lexical';

export const Color = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      CHANGE_COLOR_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            const nodes = selection.getNodes();
            const selectedText = selection.getTextContent();

            if (selectedText) {
              const colorNode = new ColorNode(selectedText, payload);

              selection.insertNodes([colorNode]);
            } else {
              nodes.forEach((node) => {
                if (node instanceof ColorNode) {
                  node.setColor(payload);
                } else if (node instanceof TextNode) {
                  const colorNode = new ColorNode(node.getTextContent(), payload);

                  node.replace(colorNode);
                }
              });
            }
          } else {
            const colorNode = new ColorNode('', payload);

            $insertNodes([colorNode]);
          }
        });

        return true;
      },
      0,
    );
  }, [editor]);

  return null;
};
