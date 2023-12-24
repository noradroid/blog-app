import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipModule } from 'shared/tooltip/tooltip.module';
import { REQUIRED_MSG } from '../generic-required-validation';
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
  @Input() onlyRequired: boolean = true; // Display the 'required' error by itself if it is flagged, otherwise, follow other rules
  @Input() onlyFirst: boolean = true; // Only display the first error flagged by validation
  @Input() errorMsgs: ValidationMsg[] = [];
  @Input() requiredMsg: ValidationMsg = REQUIRED_MSG;
}
