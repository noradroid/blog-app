import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { shareReplay } from 'rxjs';

import { PostHttpService } from '../data/post/post.http.service';
import { HttpConnectionErrorDirective } from '../shared/error/http-connection-error/http-connection-error.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpConnectionErrorDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  postService = inject(PostHttpService);

  posts$ = this.postService.getAll().pipe(shareReplay());

  error = false;
}
