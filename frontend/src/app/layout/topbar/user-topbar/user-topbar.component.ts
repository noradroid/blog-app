import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseTopbarComponent } from '../base-topbar/base-topbar.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-user-topbar',
  standalone: true,
  imports: [CommonModule, BaseTopbarComponent, TabComponent],
  templateUrl: './user-topbar.component.html',
  styleUrls: ['./user-topbar.component.scss'],
})
export class UserTopbarComponent {}
