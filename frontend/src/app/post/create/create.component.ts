import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'src/app/shared/editor/editor.module';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, EditorModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {}
