import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFormStyling]',
  standalone: true,
})
export class FormStylingDirective {
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.flex-direction') flexDirection = 'column';
  @HostBinding('style.gap.px') gap = 16;
  @HostBinding('style.margin-bottom.px') marginBottom = 24;
}
