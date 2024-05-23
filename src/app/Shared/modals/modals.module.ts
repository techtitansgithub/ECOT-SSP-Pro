import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ErrorDialogPage } from './error-dialog/error-dialog.page';
import { SuccessDialogPage } from './success-dialog/success-dialog.page';
import { MaterialModule } from '../material.module';
import { DeletePage } from './delete/delete.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule
  ],
  exports: [
    ErrorDialogPage,
    SuccessDialogPage,
    DeletePage
  ],
  declarations: 
  [
    ErrorDialogPage,
    SuccessDialogPage,
    DeletePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalsModule { }
