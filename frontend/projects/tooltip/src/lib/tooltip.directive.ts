import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

/**
 * When initiated - setup component
 * When hovered and content - setup position, content and show to true
 * When hovered and no content - show to false
 * When unhovered - show to false
 * When no content - show to false
 */
@Directive({
  selector: '[libTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  @Input()
  set libTooltip(value: string | TemplateRef<any> | null) {
    this._libTooltip = value;
    if (this.hovered) {
      this.updateTooltip();
    }
  }
  get libTooltip(): string | TemplateRef<any> | null {
    return this._libTooltip;
  }
  _libTooltip: string | TemplateRef<any> | null = null;

  tooltipRef?: ComponentRef<TooltipComponent>;

  hovered: boolean = false;

  constructor(private elementRef: ElementRef, private _vcr: ViewContainerRef) {}

  ngAfterViewInit(): void {
    this.tooltipRef = this._vcr.createComponent(TooltipComponent);
    this.tooltipRef.hostView.detectChanges();
  }

  updateTooltip(): void {
    if (this.tooltipRef) {
      if (this.libTooltip) {
        const { left, right, bottom } = (
          this.elementRef.nativeElement as HTMLElement
        ).getBoundingClientRect();
        this.tooltipRef.instance.top = bottom + 5;
        this.tooltipRef.instance.left = (left + right) / 2;
        this.tooltipRef.instance.tooltip = this.libTooltip;
      } else {
        this.hideTooltip();
      }
    }
  }

  showTooltip(): void {
    if (this.tooltipRef) {
      this.tooltipRef.instance.show = true;
    }
  }

  hideTooltip(): void {
    if (this.tooltipRef) {
      this.tooltipRef.instance.show = false;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.hovered = true;
    this.showTooltip();
    this.updateTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hovered = false;
    this.hideTooltip();
  }

  ngOnDestroy(): void {
    this.tooltipRef?.destroy();
  }
}
