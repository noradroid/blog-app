import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input()
  set size(value: number) {
    if (value > 10) {
      this._loaderWidth = value;
      this._borderWidth = (value / 10) * 1.5;
    }
  }
  _loaderWidth = 10;
  _borderWidth = 1.5; // 15%
}
