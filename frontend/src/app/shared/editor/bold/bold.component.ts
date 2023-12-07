import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-bold',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bold.component.html',
  styleUrls: ['./bold.component.scss'],
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
