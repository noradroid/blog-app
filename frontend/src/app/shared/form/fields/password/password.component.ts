import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { PASSWORD_VALIDATION_PATTERNS_MESSAGES } from '../../validation/password-validation/password-validation';
import { PasswordValidationDirective } from '../../validation/password-validation/password-validation.directive';
import { ValidationIconComponent } from '../../validation/validation-icon/validation-icon.component';
import { ValidationMsg } from '../../validation/validation-msg.type';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ValidationIconComponent,
    PasswordValidationDirective,
  ],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class PasswordInputComponent {
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

  errorMsgs: ValidationMsg[] = PASSWORD_VALIDATION_PATTERNS_MESSAGES;
}
