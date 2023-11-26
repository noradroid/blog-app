import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
})
export class FormLayoutComponent {}
