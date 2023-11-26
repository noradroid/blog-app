import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonInterface } from '../../button/button.component';

@Component({
  selector: 'app-form-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../button/action-button/action-button.component.html',
  styleUrls: ['../../button/action-button/action-button.component.scss'],
})
export class FormButtonComponent implements ButtonInterface {
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clickEvent = new EventEmitter<void>();

  handleClick(): void {
    this.clickEvent.emit();
  }
}
