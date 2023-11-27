import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameInputComponent } from './username.component';

describe('UsernameInputComponent', () => {
  let component: UsernameInputComponent;
  let fixture: ComponentFixture<UsernameInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsernameInputComponent],
    });
    fixture = TestBed.createComponent(UsernameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
