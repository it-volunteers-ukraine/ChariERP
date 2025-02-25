import { DecoratorNode } from 'lexical';

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;

  constructor(src: string, key?: string) {
    super(key);
    this.__src = src;
  }

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src);
  }

  createDOM(): HTMLElement {
    return document.createElement('div');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return <img src={this.__src} alt="Uploaded" className="h-auto max-w-full rounded-lg" />;
  }
}
