import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from 'src/app/data/post/post.model';
import { PostComponent } from '../post/post.component';
import { CommentsComponent } from 'src/app/comments/comments.component';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PostComponent, CommentsComponent],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {}
