import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberedListComponent } from './numbered-list.component';

describe('NumberedListComponent', () => {
  let component: NumberedListComponent;
  let fixture: ComponentFixture<NumberedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NumberedListComponent]
    });
    fixture = TestBed.createComponent(NumberedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
