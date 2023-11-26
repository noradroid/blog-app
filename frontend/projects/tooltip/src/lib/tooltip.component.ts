import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lib-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() tooltip: string | TemplateRef<any> = '';

  @Input() top: number = 0;
  @Input() left: number = 0;
  @Input()
  set show(value: boolean) {
    this._show = value;
  }
  get show(): boolean {
    return this._show;
  }
  private _show: boolean = false;

  isTemplateRef(): boolean {
    return this.tooltip instanceof TemplateRef;
  }

  castTemplateRef(tooltip: string | TemplateRef<any>): TemplateRef<any> {
    return tooltip as TemplateRef<any>;
  }

  castString(tooltip: string | TemplateRef<any>): string {
    return tooltip as string;
  }
}
