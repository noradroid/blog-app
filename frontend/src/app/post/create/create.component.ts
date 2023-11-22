import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSizeSelectorComponent } from 'src/app/shared/editor/font-size-selector/font-size-selector.component';
import { BoldComponent } from 'src/app/shared/editor/bold/bold.component';
import { UnderlineComponent } from 'src/app/shared/editor/underline/underline.component';
import { ItalicComponent } from 'src/app/shared/editor/italic/italic.component';
import { CursorComponent } from 'src/app/shared/editor/cursor/cursor.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FontSizeSelectorComponent,
    BoldComponent,
    ItalicComponent,
    UnderlineComponent,
    CursorComponent,
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {}
