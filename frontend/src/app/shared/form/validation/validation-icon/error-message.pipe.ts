import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(
    error: { [key: string]: boolean } | null,
    messages?: { [key: string]: string }
  ): string | null {
    if (!error || !messages) {
      return null;
    }
    return messages[Object.keys(error)[0]];
  }
}
