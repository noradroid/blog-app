import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class InputComponent {
  @Input()
  set value(val: string) {
    this._value = val;
  }
  get value(): string {
    return this._value;
  }
  _value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() id: string = 'input';
  @Input() placeholder: string = 'Enter text';
}
