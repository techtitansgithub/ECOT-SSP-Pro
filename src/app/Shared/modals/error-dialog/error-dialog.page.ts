import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.page.html',
  styleUrls: ['./error-dialog.page.scss'],
})
export class ErrorDialogPage  {

  constructor(public dialogRef: MatDialogRef<ErrorDialogPage>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public closeDialog = () => {
    this.dialogRef.close();
  }

 
}
