import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [CommonModule, SubmitButtonComponent],
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
})
export class FormLayoutComponent {
  @Input() id: string = 'form';
  @Input() submitFn!: () => Observable<any>;
  @Input() errorFn!: (err: HttpErrorResponse) => string;
}
