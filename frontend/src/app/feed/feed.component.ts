import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { mergeMap, of, shareReplay } from 'rxjs';

import { AuthService } from '../core/auth/auth.service';
import { PostHttpService } from '../data/post/post.http.service';
import { HttpConnectionErrorDirective } from '../shared/error/http-connection-error/http-connection-error.directive';
import { HtmlPipe } from '../shared/html/html.pipe';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, HttpConnectionErrorDirective, RouterLink, HtmlPipe],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  @Input() home = true;
  user$ = this.authService.user$;
  posts$ = this.user$.pipe(
    mergeMap((user) => {
      if (this.home) {
        return this.postService.getAll();
      } else {
        if (user !== null) {
          return this.postService.getAllByUserId(user.id);
        } else {
          return of([]);
        }
      }
    }),
    shareReplay()
  );
  isLoggedIn$ = this.authService.isUserLoggedIn();

  error = false;

  constructor(
    private authService: AuthService,
    private postService: PostHttpService
  ) {}
}
