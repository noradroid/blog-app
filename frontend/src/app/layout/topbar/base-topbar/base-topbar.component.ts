import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../logo/logo.component';

@Component({
  selector: 'app-base-topbar',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './base-topbar.component.html',
  styleUrls: ['./base-topbar.component.scss'],
})
export class BaseTopbarComponent {}
