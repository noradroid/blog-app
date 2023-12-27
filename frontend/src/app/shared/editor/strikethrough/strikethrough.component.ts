import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatOptionComponent } from '../format-option/format-option.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixStrikethrough } from '@ng-icons/radix-icons';

@Component({
  selector: 'app-strikethrough',
  standalone: true,
  imports: [CommonModule, FormatOptionComponent, NgIconComponent],
  templateUrl: './strikethrough.component.html',
  styleUrls: ['./strikethrough.component.scss'],
  viewProviders: [provideIcons({ radixStrikethrough })],
})
export class StrikethroughComponent {}
