import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, TabComponent],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {}
