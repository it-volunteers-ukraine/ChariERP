export const VALIDATION_MESSAGES = {
  EMAIL: {
    INVALID: 'Please enter a valid email address',
  },
  PASSWORD: {
    MIN_LENGTH: 'Password must be at least 8 characters long',
    MAX_LENGTH: 'Password must be no more 20 characters long',
  },
  REQUIRED: 'This field is required',
  STRING: 'This field must be a string',
} as const;
