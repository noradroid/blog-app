import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { PASSWORD_VALIDATION_PATTERNS_MESSAGES } from './password-validation';

@Directive({
  selector: '[appPasswordValidation]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidationDirective,
      multi: true,
    },
  ],
})
export class PasswordValidationDirective implements Validator {
  @Input() appPasswordValidation: boolean = false;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!this.appPasswordValidation) {
      return null;
    }

    return PASSWORD_VALIDATION_PATTERNS_MESSAGES.map((pattern) => {
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
