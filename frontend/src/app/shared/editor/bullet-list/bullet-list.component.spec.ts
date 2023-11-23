import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletListComponent } from './bullet-list.component';

describe('BulletListComponent', () => {
  let component: BulletListComponent;
  let fixture: ComponentFixture<BulletListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BulletListComponent]
    });
    fixture = TestBed.createComponent(BulletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
