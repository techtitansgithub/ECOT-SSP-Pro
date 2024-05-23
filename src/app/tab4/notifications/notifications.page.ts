import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Shared/data.service';
import { DialogService } from 'src/app/Shared/dialog.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { BookingDto, OrderDto } from 'src/app/models/product';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  orders:OrderDto[]|any;
  public errorMessage: string = '';
  public showError?: boolean;
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!);
  bookings:BookingDto[] |any;
  private dialogConfig: any;
  
  private refreshSubscription!: Subscription;
    constructor(
      private repository: RepositoryService,
       private router: Router, 
       private modalController: ModalController,
      private activeRoute: ActivatedRoute, 
      private dialog: MatDialog,
      private dataService: DataService,
      private dialogserve: DialogService,
    
      ) {
       }
  
    ngOnInit() {
      this.getOrders();
      this.getBookings();
    }
  

    private getOrders = () =>{
      let apiUrl: string = `api/orders/${this.loggedInUser.firstName}/BuyerOrderByName/${this.loggedInUser.lastName}`;

      this.repository.getData(apiUrl)
      .subscribe((res) => {
        this.orders = res as OrderDto[];
      },
      (err: HttpErrorResponse) =>{
        this.errorMessage = err.message;
        this.showError = true;
      })
    }

    private getBookings = () =>{
      let apiUrl: string = `api/bookings/${this.loggedInUser.firstName}/BuyerBookingByName/${this.loggedInUser.lastName}`;
      console.log(apiUrl);
      this.repository.getData(apiUrl)
      .subscribe((res) => {
        this.bookings = res as BookingDto[];
      },
      (err: HttpErrorResponse) =>{
        console.log(err);
        this.errorMessage = err.message;
        this.showError = true;
      })
    }
  
  
  
  
    public onBack(){
      this.router.navigate(['/tabs/tab4']);
    }
    async canDismiss(data?: any, role?: string) {
      return role !== 'gesture';
    }
    public redirectToDetails = async (id: string) => {
      if (this.modalController) {
        const topModal = await this.modalController.getTop();
        if (topModal) {
          this.modalController.dismiss();
        }
      }
      let url: string = `/tabs/tab4/order-details/${id}`;
      this.router.navigate([url]);
    }

    ApproveOrderUpdate(id: any) {
      this.dialogserve
        .openConfirmDialog('Did you receive the order ?')
        .afterClosed()
        .subscribe(   (res) => {
          if (res) {
            const deleteUri: string = `api/orders/${id}/approve`;
            this.repository.update2(deleteUri).subscribe((res) => {
              let dialogRef = this.dialog.open(
                SuccessDialogPage,
                this.dialogConfig
              );
              dialogRef.afterClosed().subscribe((result) => {
                this.dataService.triggerRefreshTab1(); 
                this.router.navigate(['tabs/tab4']);
              });
            });
          }
        });
    }
    public redirectToRating = (id: number) => {
      if (this.modalController) {
        this.modalController.dismiss();
      }
      let url: string = `/tabs/tab1/rating/${id}`;
      this.router.navigate([url]);
    }
}
