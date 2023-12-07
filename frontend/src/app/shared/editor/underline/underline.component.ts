import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-underline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './underline.component.html',
  styleUrls: ['./underline.component.scss'],
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
