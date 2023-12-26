import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatOptionsComponent } from './format-options.component';

describe('FormatOptionsComponent', () => {
  let component: FormatOptionsComponent;
  let fixture: ComponentFixture<FormatOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormatOptionsComponent],
    });
    fixture = TestBed.createComponent(FormatOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
