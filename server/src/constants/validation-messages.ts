export const VALIDATION_MESSAGES = {
  EMAIL: {
    INVALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    MIN_LENGTH: 'Password must be at least 8 characters long',
    MAX_LENGTH: 'Password must be no more 20 characters long',
  },
  PHONE: {
    INVALID: 'phone number must be in the format +380XXXXXXXXX',
  },
  FEEDBACK: {
    MESSAGE_TOO_LONG: 'feedback message is too long. Maximal length is 400 characters',
  },
  REQUIRED: 'This field is required',
  STRING: 'This field must be a string',
} as const;
