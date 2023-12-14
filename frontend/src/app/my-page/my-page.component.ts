import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [CommonModule, FeedComponent],
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent {}
