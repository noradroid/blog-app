import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SHA256 } from 'crypto-js';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserHttpService } from 'src/app/data/user/user.http.service';
import { FormButtonComponent } from 'src/app/shared/form/form-button/form-button.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, FormButtonComponent],
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
