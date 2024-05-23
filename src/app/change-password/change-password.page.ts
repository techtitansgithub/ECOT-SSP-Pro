import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../Shared/data.service';
import { SuccessDialogPage } from '../Shared/modals/success-dialog/success-dialog.page';
import { PasswordConfirmationValidatorService } from '../Shared/password-confirmation-validator.service';
import { RepositoryService } from '../Shared/repository.service';
import { UserForChangePasswordDto } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  errorMessage: string = '';
  dataForm: FormGroup |any;
  private dialogConfig: any;
  public showError?: boolean;
  result: any;

  loggedInUser = JSON.parse(localStorage.getItem("login-user")!)

  constructor( 
    private repoService: RepositoryService,
    private dialog: MatDialog,
    private passConfValidator: PasswordConfirmationValidatorService,
    private dataService: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Ref: MatDialogRef<ChangePasswordPage>) {}

  ngOnInit() {
    this.dataForm = new FormGroup({
      password: new FormControl(''),
      confirm: new FormControl('')
    });

    this.dataForm.get('confirm').setValidators([Validators.required, 
      this.passConfValidator.validateConfirmPassword(this.dataForm.get('password'))]);

    this.dialogConfig = {
      height: '200px',
      width: '250px',
      disableClose: true,
      data: {},
    };
    this.result = this.data;
  }

  public validateControl = (controlName: string) => {
    return this.dataForm?.get(controlName)?.invalid && this.dataForm?.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.dataForm?.get(controlName)?.hasError(errorName)
  }

  public UpdateData = (dataFormValue: any) => {
    const formValues = { ...dataFormValue };
    const data: UserForChangePasswordDto = {
      password: dataFormValue.password,
      confirmPassword: dataFormValue.confirm,
      
    };
    console.log(data);
    let id = this.loggedInUser.id;
    const apiUri: string = `api/account/changePassword/${id}`;
    console.log(apiUri);
    this.repoService.create(apiUri, data)
    .subscribe({
      next: (_) => {
        let dialogRef = this.dialog.open(
          SuccessDialogPage,
          this.dialogConfig
        );
    
        dialogRef.afterClosed().subscribe((result) => {
          this.Ref.close([]);
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          
        });
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      this.showError = true;
      this.errorMessage = err.message;
    }})
  }
  closeModal(){
    this.Ref.close([]);
  }


}
