import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/data/user/user.model';
import { PublicTopbarComponent } from '../public-topbar/public-topbar.component';
import { UserTopbarComponent } from '../user-topbar/user-topbar.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, PublicTopbarComponent, UserTopbarComponent],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  user$: Observable<User | null> = this.authService.user$;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  gotoProfile(): void {
    this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/profile']);
      } else {
        this.router.navigate(['/signup']);
      }
    });
  }
}
