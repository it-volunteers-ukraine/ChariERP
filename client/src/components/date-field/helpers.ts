import { Input } from '../input';
import { InputTypeEnum } from './types';
import { DateInput } from '../date-input/index';

export const CustomInputSwitch = (inputType?: InputTypeEnum) => {
  switch (inputType) {
    case InputTypeEnum.DATE_WITH_LABEL:
      return DateInput;

    default:
      return Input;
  }
};
