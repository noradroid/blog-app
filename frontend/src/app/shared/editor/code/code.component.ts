import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatOptionComponent } from '../format-option/format-option.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixCode } from '@ng-icons/radix-icons';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule, FormatOptionComponent, NgIconComponent],
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  viewProviders: [provideIcons({ radixCode })],
})
export class CodeComponent {}
