import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatOptionComponent } from './format-option.component';

describe('FormatOptionComponent', () => {
  let component: FormatOptionComponent;
  let fixture: ComponentFixture<FormatOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormatOptionComponent]
    });
    fixture = TestBed.createComponent(FormatOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
