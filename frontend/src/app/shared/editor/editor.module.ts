import { NgModule } from '@angular/core';

import { BoldComponent } from './bold/bold.component';
import { BulletListComponent } from './bullet-list/bullet-list.component';
import { CursorComponent } from './cursor/cursor.component';
import { FontSizeSelectorComponent } from './font-size-selector/font-size-selector.component';
import { ItalicComponent } from './italic/italic.component';
import { NumberedListComponent } from './numbered-list/numbered-list.component';
import { UnderlineComponent } from './underline/underline.component';

@NgModule({
  exports: [
    FontSizeSelectorComponent,
    BoldComponent,
    ItalicComponent,
    UnderlineComponent,
    CursorComponent,
    NumberedListComponent,
    BulletListComponent,
  ],
  imports: [
    FontSizeSelectorComponent,
    BoldComponent,
    ItalicComponent,
    UnderlineComponent,
    CursorComponent,
    NumberedListComponent,
    BulletListComponent,
  ],
})
export class EditorModule {}
