import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { UsernameValidationDirective } from '../../validation/username-validation/username-validation.directive';
import { USERNAME_VALIDATION_ERROR } from '../../validation/username-validation/username-validation-error';
import { ValidationIconComponent } from '../../validation/validation-icon/validation-icon.component';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UsernameValidationDirective,
    ValidationIconComponent,
  ],
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class UsernameInputComponent {
  @Input()
  set value(val: string) {
    this._value = val.trim();
  }
  get value(): string {
    return this._value;
  }
  _value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() validate: boolean = false;

  errorMsgs = {
    [USERNAME_VALIDATION_ERROR.alphanumericUnderscore]:
      'Only alphanumeirc and underscore characters',
    [USERNAME_VALIDATION_ERROR.minThreeLetters]: 'Minumum 3 letters',
  };
}
