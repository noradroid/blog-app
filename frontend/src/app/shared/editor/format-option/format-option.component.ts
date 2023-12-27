import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { radixListBullet } from '@ng-icons/radix-icons';
import { Observable } from 'rxjs';
import { EditorService } from '../editor.service';
import { FormatOption } from '../format-options.type';

@Component({
  selector: 'app-format-option',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './format-option.component.html',
  styleUrls: ['./format-option.component.scss'],
  viewProviders: [provideIcons({ radixListBullet })],
})
export class FormatOptionComponent implements OnInit {
  @Input() name: FormatOption | null = null;
  active = false;
  active$: Observable<boolean> | null = null;

  constructor(private service: EditorService) {}

  ngOnInit(): void {
    if (this.name) {
      this.active$ = this.service.get$(this.name);
    }
  }

  toggle(): void {
    this.active = !this.active;
    this.service.set(this.name!, this.active);
  }
}
