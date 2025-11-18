export type OptionValue = string | boolean | number;

export interface ISelectOption {
  id: string;
  value: OptionValue;
}

export type ISelectOptionSelected = ISelectOption | ISelectOption[];

export type VariantKey = 'default' | 'with-add-options';

export interface ISelectFactory {
  name: string;
  role?: string;
  isLoading?: boolean;
  variant?: VariantKey;
  placeholder?: string;
  translation?: string;
  selected: ISelectOption;
  withTranslate?: boolean;
  options: ISelectOption[];
  classNameWrapper?: string;
  classNameDropList?: string;
  onChange: (value: ISelectOption) => void;
}
