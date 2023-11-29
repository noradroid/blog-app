import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { USERNAME_VALIDATION_PATTERNS_MSGS } from './username-validation';

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

    return USERNAME_VALIDATION_PATTERNS_MSGS.map((pattern) => {
      const error = Validators.pattern(pattern.pattern)(control);
      return error ? { [pattern.name]: true } : null;
    }).reduce((prev, curr) => {
      if (prev === null) {
        return curr;
      } else {
        if (curr === null) {
          return prev;
        } else {
          return { ...prev, ...curr };
        }
      }
    });
  }
}
