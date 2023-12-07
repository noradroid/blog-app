import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  value = '';

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

  change(event: any): void {
    console.log(event);
  }
}
