import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardFeedComponent } from './post-card-feed.component';

describe('PostCardFeedComponent', () => {
  let component: PostCardFeedComponent;
  let fixture: ComponentFixture<PostCardFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostCardFeedComponent]
    });
    fixture = TestBed.createComponent(PostCardFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
