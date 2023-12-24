import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Observable,
  catchError,
  combineLatestWith,
  map,
  of,
  timer,
} from 'rxjs';

import { ButtonComponent } from 'shared/button/button.component';
import { TooltipModule } from 'shared/tooltip/tooltip.module';
import { DELAY } from 'src/app/app.constants';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoaderComponent, TooltipModule],
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
