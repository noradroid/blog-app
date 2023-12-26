import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeedComponent } from '../feed/feed.component';
import { radixPlus } from '@ng-icons/radix-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FeedComponent, NgIconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  viewProviders: [provideIcons({ radixPlus })],
})
export class HomeComponent {}
