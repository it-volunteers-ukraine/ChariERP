import { Input } from '../input';
import { DateInputWithTitle } from '../date-input-with-title/index';

import { DateStyleType } from './types';

export const CustomInputSwitch = (inputType?: DateStyleType) => {
  switch (inputType) {
    case DateStyleType.SKY_BLUE:
      return DateInputWithTitle;

    default:
      return Input;
  }
};
