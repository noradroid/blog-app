import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-box-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './box-layout.component.html',
  styleUrls: ['./box-layout.component.scss'],
})
export class BoxLayoutComponent {}
