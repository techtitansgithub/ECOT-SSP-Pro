import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService } from '../Shared/data.service';
import { DialogService } from '../Shared/dialog.service';
import { RepositoryService } from '../Shared/repository.service';
import { AddProductPage } from './add-product/add-product.page';
import { ProductDto } from '../models/product';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdatePage } from './update/update.page';
import { SuccessDialogPage } from '../Shared/modals/success-dialog/success-dialog.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  errorMessage: string = '';
  public showError?: boolean;
  private dialogConfig: any;
  private refreshSubscription!: Subscription;
  public product!:ProductDto[];
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!);
  
  constructor(    
    private repoService: RepositoryService,
    private dialog: MatDialog,
    private dataService: DataService,
    private dialogserve: DialogService) { 
      this.refreshSubscription = this.dataService.refreshTab1$.subscribe(() => {
        this.getAllProducts();
      });
    }

    ngOnInit() {
      this.getAllProducts();
  
      this.dialogConfig = {
        height: '200px',
        width: '400px',
        disableClose: true,
        data: {},
      };
    }
  addItem() {

    const popup = this.dialog.open(AddProductPage, {
      width: '400px', height: '600px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms'
    });
  }

  public getAllProducts = () => {

    let apiUrl: string = `api/products/${this.loggedInUser.id}/user`;
    this.repoService.getData(apiUrl).subscribe(res => {
      this.product = res as ProductDto[];
     
    }),
    (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }
  }

  UpdateItem(id: string) {

    const popup = this.dialog.open(UpdatePage, {
      width: '400px', height: '480px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
     data:{
      id:id
     }
    });
  }

  Delete(id: any) {
    this.dialogserve
      .openConfirmDialog('Are you sure, you want to delete this record ?')
      .afterClosed()
      .subscribe(   (res) => {
        if (res) {
          const deleteUri: string = `api/products/${id}`;
          this.repoService.delete(deleteUri).subscribe((res) => {
            let dialogRef = this.dialog.open(
              SuccessDialogPage,
              this.dialogConfig
            );
            dialogRef.afterClosed().subscribe((result) => {
              this.getAllProducts();
            });
          });
        }
      });
  }
  SoldUpdate(id: any) {
    this.dialogserve
      .openConfirmDialog('Item Sold ?')
      .afterClosed()
      .subscribe(   (res) => {
        if (res) {
          const deleteUri: string = `api/products/${id}/updateSold`;
          this.repoService.update2(deleteUri).subscribe((res) => {
            let dialogRef = this.dialog.open(
              SuccessDialogPage,
              this.dialogConfig
            );
            dialogRef.afterClosed().subscribe((result) => {
              this.dataService.triggerRefreshTab1(); 
            });
          });
        }
      });
  }

  UnSoldUpdate(id: any) {
    this.dialogserve
      .openConfirmDialog('Item UnSold ?')
      .afterClosed()
      .subscribe(   (res) => {
        if (res) {
          const deleteUri: string = `api/products/${id}/updateUnSold`;
          this.repoService.update2(deleteUri).subscribe((res) => {
            let dialogRef = this.dialog.open(
              SuccessDialogPage,
              this.dialogConfig
            );
            dialogRef.afterClosed().subscribe((result) => {
              this.dataService.triggerRefreshTab1(); 
            });
          });
        }
      });
  }


}
