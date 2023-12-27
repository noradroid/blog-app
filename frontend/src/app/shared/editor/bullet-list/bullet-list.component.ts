import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixListBullet } from '@ng-icons/radix-icons';
import { FormatOptionComponent } from '../format-option/format-option.component';

@Component({
  selector: 'app-bullet-list',
  standalone: true,
  imports: [CommonModule, FormatOptionComponent, NgIconComponent],
  templateUrl: './bullet-list.component.html',
  styleUrls: ['./bullet-list.component.scss'],
  viewProviders: [provideIcons({ radixListBullet })],
})
export class BulletListComponent {}
