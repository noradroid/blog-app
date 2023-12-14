import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseTopbarComponent } from '../base-topbar/base-topbar.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-public-topbar',
  standalone: true,
  imports: [CommonModule, BaseTopbarComponent, TabComponent],
  templateUrl: './public-topbar.component.html',
  styleUrls: ['./public-topbar.component.scss'],
})
export class PublicTopbarComponent {}
