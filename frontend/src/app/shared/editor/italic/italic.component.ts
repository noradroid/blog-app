import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../editor.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixFontItalic } from '@ng-icons/radix-icons';

@Component({
  selector: 'app-italic',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './italic.component.html',
  styleUrls: ['./italic.component.scss'],
  viewProviders: [provideIcons({ radixFontItalic })],
})
export class ItalicComponent {
  active = false;
  active$ = this.service.italic$;

  constructor(private service: EditorService) {}

  toggle(): void {
    this.active = !this.active;
    this.service.setItalic(this.active);
  }
}
