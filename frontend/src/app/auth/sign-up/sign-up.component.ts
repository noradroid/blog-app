import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserHttpService } from 'src/app/data/user/user.http.service';
import { SHA256 } from 'crypto-js';
import { ActionButtonComponent } from 'src/app/shared/action-button/action-button.component';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ActionButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  model = {
    username: '',
    password: '',
  };

  constructor(
    private service: UserHttpService,
    private authService: AuthService
  ) {}

  submit(): void {
    const model = {
      username: this.model.username,
      passwordHash: SHA256(this.model.password).toString(),
    };
    this.service
      .create(model)
      .pipe(
        switchMap((user) => {
          return this.authService.login(model);
        })
      )
      .subscribe();
  }
}
