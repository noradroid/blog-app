import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SHA256 } from 'crypto-js';
import { Observable, switchMap } from 'rxjs';

import { AuthService } from 'src/app/core/auth/auth.service';
import { UserHttpService } from 'src/app/data/user/user.http.service';
import { SubmitButtonComponent } from 'src/app/shared/form/submit-button/submit-button.component';
import { UserRequestDto } from 'src/app/data/user/dto/user-request.model';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, SubmitButtonComponent],
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

  submitFn: () => Observable<void> = (): Observable<void> => {
    const model = this.convertToUserRequestDto();
    return this.service
      .create(model)
      .pipe(switchMap((user) => this.authService.login(model)));
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

  convertToUserRequestDto(): UserRequestDto {
    return {
      username: this.model.username,
      passwordHash: SHA256(this.model.password).toString(),
    };
  }
}
