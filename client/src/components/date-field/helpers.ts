import { Input } from '../input';
import { DateStyleType } from './types';
import { DateInputWithTitle } from '../date-input-with-title/index';

export const CustomInputSwitch = (inputType?: DateStyleType) => {
  switch (inputType) {
    case DateStyleType.SKY_BLUE:
      return DateInputWithTitle;

    default:
      return Input;
  }
};
