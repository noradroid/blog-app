import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentComponent } from 'src/app/comment/comment/comment.component';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, CreateComponent],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent {}
