import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormsModule, NgForm } from '@angular/forms';
import { UsernameValidationDirective } from '../../validation/username-validation/username-validation.directive';
import { ValidationIconComponent } from '../../validation/validation-icon/validation-icon.component';
import { ValidationMsg } from '../../validation/validation-msg.type';
import { USERNAME_VALIDATION_PATTERNS_MESSAGES } from '../../validation/username-validation/username-validation';

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

  errorMsgs: ValidationMsg[] = USERNAME_VALIDATION_PATTERNS_MESSAGES;
}
