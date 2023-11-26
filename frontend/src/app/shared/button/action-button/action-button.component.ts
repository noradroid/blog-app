import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonInterface } from '../button.component';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent implements ButtonInterface {
  type = 'button';
  @Output() clickEvent = new EventEmitter<void>();

  handleClick(): void {
    this.clickEvent.emit();
  }
}
