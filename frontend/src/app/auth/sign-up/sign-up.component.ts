import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { UserRequestDto } from 'src/app/data/user/dto/user-request.model';
import { UserHttpService } from 'src/app/data/user/user.http.service';
import { User } from 'src/app/data/user/user.model';
import { PasswordInputComponent } from 'src/app/shared/form/fields/password/password.component';
import { UsernameInputComponent } from 'src/app/shared/form/fields/username/username.component';
import { FormLayoutComponent } from 'src/app/shared/form/form-layout/form-layout.component';
import { FormStylingDirective } from 'src/app/shared/form/form-styling/form-styling.directive';

@Component({
  selector: 'app-sign-up',
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
    private authService: AuthService,
    private router: Router
  ) {}

  submitFn: (form: FormGroup) => Observable<User> = (
    form: FormGroup
  ): Observable<User> => {
    const model: UserRequestDto = {
      username: form.value.username.trim(),
      password: form.value.password,
    };
    return this.service
      .create(model)
      .pipe(switchMap((user) => this.authService.login(model)));
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
