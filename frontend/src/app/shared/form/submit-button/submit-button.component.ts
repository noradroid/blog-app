import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'button';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Output() clickEvent = new EventEmitter<void>();

  handleClick(): void {
    this.clickEvent.emit();
  }
}
