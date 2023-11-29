import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { TooltipModule } from 'tooltip';
import { ValidationMsg } from '../validation-msg.type';
import { ValidationMsgPipe } from './validation-msg.pipe';

@Component({
  selector: 'app-validation-icon',
  standalone: true,
  imports: [CommonModule, TooltipModule, ValidationMsgPipe],
  templateUrl: './validation-icon.component.html',
  styleUrls: ['./validation-icon.component.scss'],
})
export class ValidationIconComponent {
  @Input() ctrl!: FormControl;
  @Input() errorMsgs: ValidationMsg[] = [];
  @Input() onlyFirst: boolean = true;
}
