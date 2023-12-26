import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numbered-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './numbered-list.component.html',
  styleUrls: ['./numbered-list.component.scss'],
})
export class NumberedListComponent {}
