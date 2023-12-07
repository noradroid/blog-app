import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-italic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './italic.component.html',
  styleUrls: ['./italic.component.scss'],
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
