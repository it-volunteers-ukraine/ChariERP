import { JSX } from 'react';
import Image from 'next/image';
import { createCommand, DecoratorNode, SerializedLexicalNode } from 'lexical';

import { ModalImg } from '@/components/modalImg';

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;

  constructor(src: string, key?: string) {
    super(key);
    this.__src = src;
  }

  static getType(): string {
    return 'image';
  }

  getSrc(): string {
    return this.__src;
  }

  setSrc(src: string): void {
    const self = this.getWritable();

    self.__src = src;
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__key);
  }

  static importJSON(serializedNode: SerializedLexicalNode): ImageNode {
    if (!('src' in serializedNode) || typeof serializedNode.src !== 'string') {
      throw new Error('Invalid serializedNode: missing or invalid src property');
    }

    return new ImageNode(serializedNode.src);
  }

  exportJSON(): { type: string; src: string; version: number } {
    return {
      type: 'image',
      src: this.__src,
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div');

    div.setAttribute('data-key', this.__key);

    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <div style={{ position: 'relative' }}>
        <ModalImg url={this.__src}>
          <Image
            width={0}
            height={0}
            alt="Photo"
            src={this.__src}
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              borderRadius: '4px',
              objectFit: 'contain',
            }}
          />
        </ModalImg>
      </div>
    );
  }
}

export const INSERT_IMAGE_COMMAND = createCommand<string>('INSERT_IMAGE_COMMAND');
