import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import {
  USERNAME_ALPHANUMERIC_UNDERSCORE_REGEX,
  USERNAME_MIN_THREE_LETTERS_REGEX,
} from './username-regex';
import { USERNAME_VALIDATION_ERROR } from './username-validation-error';

@Directive({
  selector: '[appUsernameValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UsernameValidationDirective,
      multi: true,
    },
  ],
})
export class UsernameValidationDirective implements Validator {
  @Input() appUsernameValidation: boolean = false;

  /**
   * @returns Either
   * { alphanumericUnderscore: true } or
   * { minThreeLetters: true } or
   * null.
   */
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.appUsernameValidation) {
      return null;
    }

    const alphanumericUnderscoreCheck = Validators.pattern(
      USERNAME_ALPHANUMERIC_UNDERSCORE_REGEX
    )(control);
    if (alphanumericUnderscoreCheck) {
      return { [USERNAME_VALIDATION_ERROR.alphanumericUnderscore]: true };
    }
    const minThreeLettersCheck = Validators.pattern(
      USERNAME_MIN_THREE_LETTERS_REGEX
    )(control);
    if (minThreeLettersCheck) {
      return { [USERNAME_VALIDATION_ERROR.minThreeLetters]: true };
    }
    return null;
  }
}
