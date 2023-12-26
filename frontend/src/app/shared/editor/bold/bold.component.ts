import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixFontBold } from '@ng-icons/radix-icons';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-bold',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './bold.component.html',
  styleUrls: ['./bold.component.scss'],
  viewProviders: [provideIcons({ radixFontBold })],
})
export class BoldComponent {
  active = false;
  active$ = this.service.bold$;

  constructor(private service: EditorService) {}

  toggle(): void {
    this.active = !this.active;
    this.service.setBold(this.active);
  }
}
