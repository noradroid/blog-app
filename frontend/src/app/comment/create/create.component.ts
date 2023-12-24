import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from 'shared/button/button.component';
import { InputComponent } from 'src/app/shared/form/fields/input/input.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  submit(): void {
    console.log('submit');
  }
}
