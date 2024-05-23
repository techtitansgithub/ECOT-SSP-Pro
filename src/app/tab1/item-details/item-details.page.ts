import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/Shared/data.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { ProductDto } from 'src/app/models/product';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  public errorMessage: string = '';
  public showError?: boolean;
  public product!:ProductDto |any;
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!)
  selectedImage: string | null = null;
  private dialogConfig: any;
  address: string = '';
  quantity?: any = 0;
  selectedDateTime?: string |any; 
  name: string |any;

 constructor(
  private repository: RepositoryService,
   private router: Router, 
   private modalController: ModalController,
  private activeRoute: ActivatedRoute, 
  private dialog: MatDialog,
  private dataService: DataService,

  ) {
   
   }

  ngOnInit() {
    this.getCatererDetails();

    if (this.product?.images.length > 0) {
      this.selectedImage = this.product?.images[0].filePath;
    }
    
    this.dialogConfig = {
      height: '200px',
      width: '250px',
      disableClose: true,
      data: {},
    };
  }


  private getCatererDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/products/${id}`;
 
    this.repository.getData(apiUrl)
    .subscribe((res) => {
      this.product = res as ProductDto;
    },
    (err: HttpErrorResponse) =>{
      this.errorMessage = err.message;
      this.showError = true;
    })
  }


  public onBack(){
    this.router.navigate(['/tabs/tab1']);
  }


  public redirectToDetails() {
    this.router.navigate(['/tabs/tab3']);
  }

  displayImage(filePath: string) {
    this.selectedImage = filePath;
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  async canDismiss1(data?: any, role?: string) {
    return role !== 'gesture';
  }


  public redirectToBook = (id: string) => {
    if (this.modalController) {
      this.modalController.dismiss();
    }
    let url: string = `/tabs/tab1/book/${id}`;
    this.router.navigate([url]);
  }

  public Order() {
    if (!this.product) {
      console.error("Product details not available.");
      return;
    }
  
    const orderDetails = {
      ProductName: this.product.name,
      ProductId: this.product.id,
      ProductDescription: this.product.description,
      ProductPrice: this.product.price,
      FilePath: this.product.images.length > 0 ? this.product.images[0].filePath : '',
      SellerName:this.product.sellerName,
      SellerSurName: this.product.sellerSurName,
      BuyerName: this.loggedInUser.firstName,
      BuyerSurName:this.loggedInUser.lastName,
      buyerAddress: this.address,
      quantity: this.quantity


    };

    this.repository.create('api/orders', orderDetails).subscribe(
      (res) => {
        let dialogRef = this.dialog.open(
          SuccessDialogPage,
          this.dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {

          const updateQantity = {
            quantity: (this.product.quantity - this.quantity)
          };
          console.log("avail: "+this.product.quantity);
          let id: string = this.activeRoute.snapshot.params['id'];
          this.repository.update(`api/products/${id}/updateQuantity`, updateQantity).subscribe(
            (res) => {});

          this.dataService.triggerRefreshTab1();
          if (this.modalController) {
            this.modalController.dismiss();
          }
        });
      },
      (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    );
  }

  public Booking() {
    if (!this.product) {
      console.error("Product details not available.");
      return;
    }
  
    const orderDetails = {
      ProductId: this.product.id,
      ProductName: this.product.name,
      ProductDescription: this.product.description,
      ProductPrice: this.product.price,
      SellerName:this.product.sellerName,
      SellerSurName: this.product.sellerSurName,
      BuyerName: this.loggedInUser.firstName,
      BuyerSurName:this.loggedInUser.lastName,
      bookDate: new Date(this.selectedDateTime)

    };

    this.repository.create('api/bookings', orderDetails).subscribe(
      (res) => {
        let dialogRef = this.dialog.open(
          SuccessDialogPage,
          this.dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
          this.dataService.triggerRefreshTab1();
        });
      },
      (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    );
  }

}
