import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { shareReplay } from 'rxjs';

import { AuthService } from '../core/auth/auth.service';
import { PostHttpService } from '../data/post/post.http.service';
import { HttpConnectionErrorDirective } from '../shared/error/http-connection-error/http-connection-error.directive';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, HttpConnectionErrorDirective],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  posts$ = this.postService.getAll().pipe(shareReplay());
  isLoggedIn$ = this.authService.isUserLoggedIn();

  error = false;

  constructor(
    private authService: AuthService,
    private postService: PostHttpService
  ) {}
}
