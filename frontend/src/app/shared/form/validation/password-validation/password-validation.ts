import { ValidationPatternMsg } from '../validation-pattern-msg.type';

export const PASSWORD_VALIDATION_PATTERNS_MSGS: ValidationPatternMsg[] = [
  {
    name: 'uppercase',
    pattern: /^.*[A-Z]+.*$/,
    msg: 'Minimum 1 uppercase letter',
  },
  {
    name: 'lowercase',
    pattern: /^.*[a-z]+.*$/,
    msg: 'Minimum 1 lowercase letter',
  },
  {
    name: 'number',
    pattern: /^.*[0-9]+.*$/,
    msg: 'Minimum 1 number',
  },
  {
    name: 'symbol',
    pattern: /^.*[^A-Za-z0-9]+.*$/,
    msg: 'Minimum 1 symbol',
  },
  {
    name: 'minLength',
    pattern: /^.{8,}$/,
    msg: 'Minimum 8 characters',
  },
];
