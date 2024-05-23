import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingPage } from './star-rating.page';

describe('StarRatingPage', () => {
  let component: StarRatingPage;
  let fixture: ComponentFixture<StarRatingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StarRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
