import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentSectionComponent } from 'src/app/comment/comment-section/comment-section.component';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PostComponent, CommentSectionComponent],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {}
