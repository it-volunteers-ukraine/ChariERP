export const VALIDATION_MESSAGES = {
  EMAIL: {
    INVALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    MIN_LENGTH: 'Password must be at least 8 characters long',
    MAX_LENGTH: 'Password must be no more 20 characters long',
  },
  PHONE: {
    INVALID: 'Phone number must be in the format +380XXXXXXXXX',
  },
  FEEDBACK: {
    MESSAGE_MAX_LENGTH: 'Feedback message is too long. Maximal length is 400 characters',
  },
  ASSET: {
    NAME_INVALID_CHARACTERS: 'Asset name must not contain special characters',
    NAME_MIN_LENGTH: 'Asset name must be at least 2 characters long',
    NAME_MAX_LENGTH: 'Asset name must be no more 100 characters long',
    DATE_INVALID: 'Asset date must be in the format DD.MM.YYYY',
    VALUE_DECIMAL: 'Asset value must have no more than 2 decimal places',
    DESC_MAX_LENGTH: 'Asset description must be no more 500 characters long'
  },
  REQUIRED: 'This field is required',
  STRING: 'This field must be a string',
} as const;
