import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { shareReplay } from 'rxjs';

import { AuthService } from '../core/auth/auth.service';
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
  posts$ = this.postService.getAll().pipe(shareReplay());
  isLoggedIn$ = this.authService.isUserLoggedIn();

  error = false;

  constructor(
    private authService: AuthService,
    private postService: PostHttpService
  ) {}
}
