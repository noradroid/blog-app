import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: `
    <button [libTooltip]="template"></button>
    <ng-template #template>{{ content }}</ng-template>
  `,
})
class TestComponent {
  content = 'Template content.';
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestComponent, TooltipComponent],
      imports: [CommonModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });
    fixture = TestBed.createComponent(TestComponent);
  });

  it('should create tooltip with content', () => {
    const tooltipDebugEl =
      fixture.debugElement.childNodes[
        fixture.debugElement.childNodes.length - 1
      ];
    expect(tooltipDebugEl).toBeDefined();
  });
});
