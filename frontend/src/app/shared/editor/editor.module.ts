import { NgModule } from '@angular/core';

import { FormatOptionsComponent } from './format-options/format-options.component';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
  exports: [FormatOptionsComponent, TextareaComponent],
  imports: [FormatOptionsComponent, TextareaComponent],
})
export class EditorModule {}
