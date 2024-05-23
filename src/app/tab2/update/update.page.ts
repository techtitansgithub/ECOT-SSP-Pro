import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/Shared/data.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { CategoryDto, ProductDto, ProductForCreationDto, ProductForUpdateDto } from 'src/app/models/product';
import { AddProductPage } from '../add-product/add-product.page';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  errorMessage: string = '';
  dataForm: FormGroup |any;
  private dialogConfig: any;
  public showError?: boolean;
  result: any;
  response!: { dbPath: '' };
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!);
  public categories!:CategoryDto[];
  product : ProductDto |any;
  
  constructor( 
    private repoService: RepositoryService,
    private dialog: MatDialog,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Ref: MatDialogRef<UpdatePage>) {}

  ngOnInit() {
    this.result = this.data;
    this.dataForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      condition: new FormControl(''),
      categoryId: new FormControl(''),
      sellerPhone: new FormControl('')
    });

    this.dialogConfig = {
      height: '200px',
      width: '250px',
      disableClose: true,
      data: {},
    };
this.getAllCategories();
this.getProdcutToUpdate();

  }
  uploadFinished = (event: any) => {
    this.response = event;
  };

  public getAllCategories = () => {
    this.repoService.getData('api/categories').subscribe(res => {
      this.categories = res as CategoryDto[];
     console.log(this.categories);
    }),
    (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }
  }
  public validateControl = (controlName: string) => {
    return this.dataForm?.get(controlName)?.invalid && this.dataForm?.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.dataForm?.get(controlName)?.hasError(errorName)
  }

  public createData = (dataFormValue: any) => {

    if (this.dataForm.valid) {
      this.executeDataCreation(dataFormValue);

    }
  };
  private executeDataCreation = (dataFormValue: any) => {

    let product: ProductForUpdateDto = {
   
      name: dataFormValue.name,
      description: dataFormValue.description,
      price: dataFormValue.price,
      condition: dataFormValue.condition,

    };
    console.log(product);

    let id = this.result.id;
    const apiUri: string = `api/products/${id}`;
    this.repoService.update(apiUri, product).subscribe(
      (res) => {
        let dialogRef = this.dialog.open(
          SuccessDialogPage,
          this.dialogConfig
        );
        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed().subscribe((result) => {
          this.dataService.triggerRefreshTab1();
          this.Ref.close([]);
        });
      },
      (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    );
  };

  closeModal(){
    this.Ref.close([]);
  }
  private getProdcutToUpdate = () => {
    let id = this.result.id;
    const Uri: string = `api/products/${id}`;
    this.repoService.getData(Uri)
    .subscribe({
      next: (own: ProductDto|any) => {
        this.product={...own};
        this.dataForm.patchValue(this.product);
        this.response = { dbPath: this.product?.pictureUrl || '' };
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }
}
