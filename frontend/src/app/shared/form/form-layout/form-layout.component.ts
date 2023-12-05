import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
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
  @Input() form!: FormGroup;
  @Input() submitFn!: (form: FormGroup) => Observable<any>;
  @Input() completeFn!: (res: any) => void;
  @Input() errorFn!: (err: HttpErrorResponse) => string;
}
