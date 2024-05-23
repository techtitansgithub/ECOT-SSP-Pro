import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessDialogPage } from './success-dialog.page';

describe('SuccessDialogPage', () => {
  let component: SuccessDialogPage;
  let fixture: ComponentFixture<SuccessDialogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
