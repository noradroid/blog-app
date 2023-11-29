import { ValidationPatternMsg } from '../validation-pattern-msg.type';

export const USERNAME_VALIDATION_PATTERNS_MSGS: ValidationPatternMsg[] = [
  {
    name: 'alphanumericUnderscore',
    pattern: /^\w+$/,
    msg: 'Only alphanumeirc and underscore characters',
  },
  {
    name: 'minThreeLetters',
    pattern: /^.*([A-Za-z].*){3,}$/,
    msg: 'Minumum 3 letters',
  },
];
