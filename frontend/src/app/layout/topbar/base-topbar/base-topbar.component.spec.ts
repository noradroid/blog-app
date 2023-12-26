import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTopbarComponent } from './base-topbar.component';

describe('BaseTopbarComponent', () => {
  let component: BaseTopbarComponent;
  let fixture: ComponentFixture<BaseTopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BaseTopbarComponent],
    });
    fixture = TestBed.createComponent(BaseTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
