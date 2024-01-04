import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ImageHttpService } from 'src/app/data/image/image.http.service';

import { Post } from 'src/app/data/post/post.model';
import { HtmlPipe } from 'src/app/shared/html/html.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink, HtmlPipe],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post$: Observable<Post> = this.route.data.pipe(map((data) => data['post']));
  imgUrl$: Observable<string> = this.post$.pipe(
    map((post) => this.imageService.getImageUrl(post.imageId))
  );

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageHttpService
  ) {}
}
