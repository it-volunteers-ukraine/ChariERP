export type OptionValue = string | boolean | number;

export interface ISelectOption {
  id: string;
  value: OptionValue;
}

export type ISelectOptionSelected = ISelectOption | ISelectOption[];
