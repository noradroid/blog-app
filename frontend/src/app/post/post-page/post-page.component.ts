import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from 'src/app/data/post/post.model';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {
  post!: Post;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => (this.post = data['post']));
  }
}
