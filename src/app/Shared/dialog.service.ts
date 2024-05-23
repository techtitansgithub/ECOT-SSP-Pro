import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeletePage } from './modals/delete/delete.page';





@Injectable({
  providedIn: 'root'
})
export class DialogService {

 constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg:any) {
    return this.dialog.open(DeletePage, {
     
      width: '350px',
      height: '240px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: '200px' },
      data: {
        message: msg,
      },
    });
  }

}
