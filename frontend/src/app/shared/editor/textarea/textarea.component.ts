import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaComponent,
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  set value(value: string) {
    this._value = value;
    console.log(value);
  }
  get value(): string {
    return this._value;
  }
  _value = '';

  constructor(private service: EditorService) {
    this.service.bold$.subscribe((bold) => {
      if (bold) {
        document.execCommand('bold', false);
      } else {
        document.execCommand('bold', false);
      }
    });
    this.service.italic$.subscribe((italic) => {
      if (italic) {
        document.execCommand('italic', false);
      } else {
        document.execCommand('italic', false);
      }
    });
    this.service.underline$.subscribe((underline) => {
      if (underline) {
        document.execCommand('underline', false);
      } else {
        document.execCommand('underline', false);
      }
    });
  }

  writeValue(value: string): void {
    this.value = value;
  }

  onChange = (value: string) => {};
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  disabled = false;
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
