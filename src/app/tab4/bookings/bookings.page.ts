import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Shared/data.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { BookingDto } from 'src/app/models/product';
import { BookingUpdatePage } from '../booking-update/booking-update.page';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings:BookingDto[] |any;
  allBookings:BookingDto[] |any;
  public errorMessage: string = '';
  public showError?: boolean;
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!)
  private refreshSubscription!: Subscription;
  selectedDateTime?: string; 
  private dialogConfig: any;

    constructor(
      private repository: RepositoryService,
       private router: Router, 
       private modalController: ModalController,
      private activeRoute: ActivatedRoute, 
      private dialog: MatDialog,
      private dataService: DataService,
    
      ) {
        this.refreshSubscription = this.dataService.refreshTab1$.subscribe(() => {
          this.getBookings();
          this.getAllBookings();
        });
       }
  
    ngOnInit() {
      this.getBookings();
      this.getAllBookings();

      this.dialogConfig = {
        height: '200px',
        width: '250px',
        disableClose: true,
        data: {},
      };
    }
  
    private getBookings = () =>{
      let apiUrl: string = `api/bookings/${this.loggedInUser.firstName}/${this.loggedInUser.lastName}/PendingBookingByName`;
   
      this.repository.getData(apiUrl)
      .subscribe((res) => {
        this.bookings = res as BookingDto[];
      },
      (err: HttpErrorResponse) =>{
        this.errorMessage = err.message;
        this.showError = true;
      })
    }
  
    private getAllBookings = () =>{
      let apiUrl: string = `api/bookings/AllBooking/${this.loggedInUser.firstName}/BookingByName/${this.loggedInUser.lastName}`;
   
      this.repository.getData(apiUrl)
      .subscribe((res) => {
        this.allBookings = res as BookingDto[];
      },
      (err: HttpErrorResponse) =>{
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
public closeModal = async() =>{
  if (this.modalController) {
    const topModal = await this.modalController.getTop();
    if (topModal) {
      this.modalController.dismiss();
    }
  }
}

UpdateItem(id: any) {
  const popup = this.dialog.open(BookingUpdatePage, {
    width: '400px', height: '500px',
    enterAnimationDuration: '100ms',
    exitAnimationDuration: '100ms',
    position: { top: '20px'},
   data:{
    id:id
   }
  });
}

public redirectToDetailsconfirm = async (id: string) => {
  if (this.modalController) {
    const topModal = await this.modalController.getTop();
    if (topModal) {
      this.modalController.dismiss();
    }
  }
  let url: string = `/tabs/tab4/confirm-booking/${id}`;
  this.router.navigate([url]);
}



}
