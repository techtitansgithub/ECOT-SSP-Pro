import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingUpdatePage } from './booking-update.page';

describe('BookingUpdatePage', () => {
  let component: BookingUpdatePage;
  let fixture: ComponentFixture<BookingUpdatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookingUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
