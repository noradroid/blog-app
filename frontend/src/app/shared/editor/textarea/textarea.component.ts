import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('content') content!: ElementRef;

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
    this.service.get$('strikethrough').subscribe((strikethrough) => {
      if (strikethrough) {
        document.execCommand('strikethrough', false);
      } else {
        document.execCommand('strikethrough', false);
      }
    });
    this.service.get$('bulletList').subscribe((bulletList) => {
      if (bulletList) {
        document.execCommand('insertUnorderedList', true);
      } else {
        document.execCommand('insertUnorderedList', false);
      }
    });
    this.service.get$('code').subscribe((code) => {
      if (code) {
        document.execCommand('fontName', false, 'Consolas');
      } else {
        document.execCommand('fontName', false, 'Lato');
      }
    });
  }

  writeValue(value: string): void {
    this.content.nativeElement.value = value;
    console.log(value);
  }

  onChange = (value: string) => {};
  onTouched = () => {};
  disabled = false;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
