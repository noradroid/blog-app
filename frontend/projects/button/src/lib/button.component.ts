import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonInterface } from './button.interface';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements ButtonInterface {
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clickEvent = new EventEmitter<void>();

  handleClick(): void {
    this.clickEvent.emit();
  }
}
