import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core';
import { radixPlus } from '@ng-icons/radix-icons';

import { FeedComponent } from '../feed/feed.component';
import { PostCardFeedComponent } from '../post/post-card-feed/post-card-feed.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeedComponent,
    NgIconComponent,
    PostCardFeedComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  viewProviders: [
    provideIcons({ radixPlus }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class HomeComponent {}
