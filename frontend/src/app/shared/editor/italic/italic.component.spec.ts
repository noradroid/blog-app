import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItalicComponent } from './italic.component';

describe('ItalicComponent', () => {
  let component: ItalicComponent;
  let fixture: ComponentFixture<ItalicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItalicComponent],
    });
    fixture = TestBed.createComponent(ItalicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
