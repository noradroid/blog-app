import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  exports: [TooltipComponent, TooltipDirective],
  imports: [TooltipComponent, TooltipDirective],
})
export class TooltipModule {}
