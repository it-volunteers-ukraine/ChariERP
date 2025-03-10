import { createCommand, DecoratorNode, LexicalNode } from 'lexical';
import { SerializedLexicalNode } from 'lexical';

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

  static clone(node: LexicalNode): ImageNode {
    if (!(node instanceof ImageNode)) {
      throw new Error('Invalid node: expected ImageNode');
    }

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
    const img = document.createElement('img');

    img.src = this.__src;
    img.alt = 'photo';
    img.className = 'img';
    img.setAttribute('data-key', this.__key);

    return img;
  }

  updateDOM(prevNode: ImageNode, dom: HTMLElement): false {
    if (prevNode.__src !== this.__src) {
      dom.setAttribute('src', this.__src);
    }

    return false;
  }

  decorate(): JSX.Element {
    return <img src={this.__src} alt="Uploaded" className="w-200" />;
  }
}

export const INSERT_IMAGE_COMMAND = createCommand<string>('INSERT_IMAGE_COMMAND');
