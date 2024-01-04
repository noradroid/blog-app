import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { mergeMap, of, shareReplay } from 'rxjs';

import { HttpConnectionErrorDirective } from 'shared/error/http-connection-error/http-connection-error.directive';
import { HtmlPipe } from 'shared/html/html.pipe';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PostHttpService } from 'src/app/data/post/post.http.service';
import { ImageHttpService } from 'src/app/data/image/image.http.service';

@Component({
  selector: 'app-post-card-feed',
  standalone: true,
  imports: [CommonModule, HttpConnectionErrorDirective, RouterLink, HtmlPipe],
  templateUrl: './post-card-feed.component.html',
  styleUrls: ['./post-card-feed.component.scss'],
})
export class PostCardFeedComponent {
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

  constructor(
    private authService: AuthService,
    private postService: PostHttpService,
    public imageService: ImageHttpService
  ) {}
}
