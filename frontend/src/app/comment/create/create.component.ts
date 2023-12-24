import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'button';
import { InputComponent } from 'src/app/shared/form/fields/input/input.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  submit(): void {
    console.log('submit');
  }
}
