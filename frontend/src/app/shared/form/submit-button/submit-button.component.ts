import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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
  @Input() submitFn!: () => Observable<any>;
  @Input() errorFn!: (err: HttpErrorResponse) => string;
  @Output() completeEvent = new EventEmitter<void>();
  loading = false;

  error: string = '';

  handleClick(): void {
    this.loading = true;
    this.error = '';
    this.submitFn()
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
          }
          this.completeEvent.emit();
        },
        error: (err) => {},
      });
  }
}
