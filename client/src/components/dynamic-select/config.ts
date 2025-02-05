import { OptionBase } from './select-logic-wrapper/option-base';
import { SelectedBase } from './select-logic-wrapper/selected-base';

export enum Select {
  BASE = 'BASE',
}
export enum Option {
  BASE = 'BASE',
}

export const SwitchSelect = (selectType?: Select) => {
  switch (selectType) {
    case Select.BASE:
      return SelectedBase;

    default:
      return SelectedBase;
  }
};

export const SwitchOption = (optionType?: Option) => {
  switch (optionType) {
    case Option.BASE:
      return OptionBase;

    default:
      return OptionBase;
  }
};
