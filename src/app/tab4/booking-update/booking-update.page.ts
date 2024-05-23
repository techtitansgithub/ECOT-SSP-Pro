import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Shared/data.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { BookingDto } from 'src/app/models/product';

@Component({
  selector: 'app-booking-update',
  templateUrl: './booking-update.page.html',
  styleUrls: ['./booking-update.page.scss'],
})
export class BookingUpdatePage implements OnInit {
  bookings:BookingDto[] |any;
  allBookings:BookingDto[] |any;
  public errorMessage: string = '';
  public showError?: boolean;
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!)
  private refreshSubscription!: Subscription;
  selectedDateTime?: string; 
  private dialogConfig: any;
  result: any;
  address: string = '';

    constructor(
      private repository: RepositoryService,
       private router: Router, 
       private modalController: ModalController,
      private activeRoute: ActivatedRoute, 
      private dialog: MatDialog,
      private dataService: DataService,) {}

  ngOnInit() {
    this.dialogConfig = {
      height: '200px',
      width: '250px',
      disableClose: true,
      data: {},
    };
  }

  public Booking() {
    if (!this.selectedDateTime) {
      console.error('No date and time selected');
      return; 
    }
    const data = {
      sellerAddress: this.address,
      bookDate: new Date(this.selectedDateTime)

    };
    let id: string = this.activeRoute.snapshot.params['id'];
    this.repository.update(`api/bookings/${id}`, data).subscribe(
      (res) => {
        let dialogRef = this.dialog.open(
          SuccessDialogPage,
          this.dialogConfig
        );
        dialogRef.afterClosed().subscribe((result) => {
          this.dataService.triggerRefreshTab1();
          this.router.navigate(['/tabs/tab4/bookings']);
        });
      },
      (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    );
  }
  closeModal(){
    this.router.navigate(['/tabs/tab4/bookings']);
  }
}
