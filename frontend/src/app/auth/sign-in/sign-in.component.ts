import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginRequestDto } from 'src/app/core/auth/login-request.model';
import { User } from 'src/app/data/user/user.model';
import { PasswordInputComponent } from 'src/app/shared/form/fields/password/password.component';
import { UsernameInputComponent } from 'src/app/shared/form/fields/username/username.component';
import { FormLayoutComponent } from 'src/app/shared/form/form-layout/form-layout.component';
import { FormStylingDirective } from 'src/app/shared/form/form-styling/form-styling.directive';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormLayoutComponent,
    FormStylingDirective,
    UsernameInputComponent,
    PasswordInputComponent,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  model = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  submitFn: (form: FormGroup) => Observable<User> = (
    form: FormGroup
  ): Observable<User> => {
    const model: LoginRequestDto = {
      username: form.value.username,
      password: form.value.password,
    };
    return this.authService.login(model);
  };

  completeFn: (res: User) => void = (res: User): void => {
    this.router.navigate(['/']);
  };

  errorFn: (err: HttpErrorResponse) => string = (
    err: HttpErrorResponse
  ): string => {
    if (err.status !== 0) {
      return err.error.detail;
    } else {
      return 'Client side error';
    }
  };
}
