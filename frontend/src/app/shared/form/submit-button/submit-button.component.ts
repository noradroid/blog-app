import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import {
  Observable,
  catchError,
  combineLatestWith,
  map,
  of,
  timer,
} from 'rxjs';

import { ButtonModule } from 'button';
import { TooltipModule } from 'tooltip';
import { DELAY } from 'src/app/app.constants';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, LoaderComponent, TooltipModule],
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent {
  @Input() id: string = 'form';
  @Input() form!: FormGroup;
  @Input() submitFn!: (form: FormGroup) => Observable<any>;
  @Input() completeFn!: (res: any) => void;
  @Input() errorFn!: (err: HttpErrorResponse) => string;
  loading = false;

  error: string = '';

  handleClick(): void {
    if (this.form.valid) {
      this.loading = true;
      this.error = '';
      this.submitFn(this.form)
        .pipe(
          catchError((err) => of(err)),
          combineLatestWith(timer(DELAY)),
          map(([res, _]) => res)
        )
        .subscribe({
          next: (res) => {
            this.loading = false;
            if (res instanceof HttpErrorResponse) {
              this.error = this.errorFn(res);
            } else {
              this.error = '';
              this.completeFn(res);
            }
          },
          error: (err) => {},
        });
    }
  }
}
