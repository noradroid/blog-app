import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { TooltipModule } from 'tooltip';
import { ErrorMessagePipe } from './error-message.pipe';

@Component({
  selector: 'app-validation-icon',
  standalone: true,
  imports: [CommonModule, TooltipModule, ErrorMessagePipe],
  templateUrl: './validation-icon.component.html',
  styleUrls: ['./validation-icon.component.scss'],
})
export class ValidationIconComponent {
  @Input() ctrl!: FormControl;
  @Input() errorMsgs: { [key: string]: string } = {};
}
