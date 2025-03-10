import { createCommand, SerializedTextNode, TextNode } from 'lexical';

type SerializedColorNode = SerializedTextNode & {
  color: string;
};

export class ColorNode extends TextNode {
  __color: string;

  constructor(text: string, color: string, key?: string) {
    super(text, key);
    this.__color = color;
  }

  static getType(): string {
    return 'color';
  }

  getColor(): string {
    return this.__color;
  }

  setColor(color: string): void {
    const self = this.getWritable();

    self.__color = color;
  }

  static clone(node: ColorNode): ColorNode {
    return new ColorNode(node.__text, node.__color, node.__key);
  }

  static importJSON(serializedNode: SerializedColorNode): ColorNode {
    return new ColorNode(serializedNode.text, serializedNode.color);
  }

  exportJSON(): SerializedColorNode {
    return {
      ...super.exportJSON(),
      type: 'color',
      color: this.__color,
    };
  }

  createDOM(): HTMLElement {
    const element = document.createElement('span');

    element.textContent = this.__text;
    element.style.color = this.__color;

    return element;
  }

  updateDOM(prevNode: ColorNode, dom: HTMLElement): boolean {
    if (prevNode.__color !== this.__color) {
      dom.style.color = this.__color;
    }

    return true;
  }
}

export const CHANGE_COLOR_COMMAND = createCommand<string>('CHANGE_COLOR_COMMAND');
