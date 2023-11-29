import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationMsg } from '../validation-msg.type';

@Pipe({
  name: 'validationMsg',
  standalone: true,
})
export class ValidationMsgPipe implements PipeTransform {
  transform(
    errors: ValidationErrors | null,
    msgs?: ValidationMsg[]
  ): string | null {
    if (!errors || !msgs || msgs.length === 0) {
      return null;
    }
    const firstError = Object.keys(errors)[0];
    const validationMsg = msgs.find((msg) => msg.name === firstError);
    return validationMsg?.msg ?? null;
  }
}
