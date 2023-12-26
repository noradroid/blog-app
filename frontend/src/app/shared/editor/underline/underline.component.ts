import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../editor.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixUnderline } from '@ng-icons/radix-icons';

@Component({
  selector: 'app-underline',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './underline.component.html',
  styleUrls: ['./underline.component.scss'],
  viewProviders: [provideIcons({ radixUnderline })],
})
export class UnderlineComponent {
  active = false;
  active$ = this.service.underline$;

  constructor(private service: EditorService) {}

  toggle(): void {
    this.active = !this.active;
    this.service.setUnderline(this.active);
  }
}
