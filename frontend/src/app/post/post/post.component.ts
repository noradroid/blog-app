import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Post } from 'src/app/data/post/post.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post$: Observable<Post> = this.route.data.pipe(map((data) => data['post']));

  constructor(private route: ActivatedRoute) {}
}
