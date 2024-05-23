import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDialogPage } from './error-dialog.page';

describe('ErrorDialogPage', () => {
  let component: ErrorDialogPage;
  let fixture: ComponentFixture<ErrorDialogPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ErrorDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
