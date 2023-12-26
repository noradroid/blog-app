import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoldComponent } from './bold.component';

describe('BoldComponent', () => {
  let component: BoldComponent;
  let fixture: ComponentFixture<BoldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoldComponent],
    });
    fixture = TestBed.createComponent(BoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
