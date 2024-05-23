import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/Shared/data.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { ProductDto } from 'src/app/models/product';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
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
      
      this.dialogConfig = {
        height: '200px',
        width: '250px',
        disableClose: true,
        data: {},
      };
    }
  public onBack(){
    this.router.navigate(['/tabs/tab1']);
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
