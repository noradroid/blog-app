import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoldComponent } from '../bold/bold.component';
import { BulletListComponent } from '../bullet-list/bullet-list.component';
import { FontSizeSelectorComponent } from '../font-size-selector/font-size-selector.component';
import { ItalicComponent } from '../italic/italic.component';
import { NumberedListComponent } from '../numbered-list/numbered-list.component';
import { UnderlineComponent } from '../underline/underline.component';

@Component({
  selector: 'app-format-options',
  standalone: true,
  imports: [
    CommonModule,
    BoldComponent,
    ItalicComponent,
    UnderlineComponent,
    BulletListComponent,
    NumberedListComponent,
    FontSizeSelectorComponent,
  ],
  templateUrl: './format-options.component.html',
  styleUrls: ['./format-options.component.scss'],
})
export class FormatOptionsComponent {}
