import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputComponent } from './password.component';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasswordInputComponent],
    });
    fixture = TestBed.createComponent(PasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
