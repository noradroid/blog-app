import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpConnectionErrorComponent } from './http-connection-error.component';

describe('HttpConnectionErrorComponent', () => {
  let component: HttpConnectionErrorComponent;
  let fixture: ComponentFixture<HttpConnectionErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpConnectionErrorComponent]
    });
    fixture = TestBed.createComponent(HttpConnectionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
