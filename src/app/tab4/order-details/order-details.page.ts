import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/Shared/data.service';
import { DialogService } from 'src/app/Shared/dialog.service';
import { SuccessDialogPage } from 'src/app/Shared/modals/success-dialog/success-dialog.page';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { OrderDto } from 'src/app/models/product';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  order:OrderDto |any;
  public errorMessage: string = '';
  public showError?: boolean;
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!);
  private dialogConfig: any;
  
    constructor(
      private repository: RepositoryService,
       private router: Router, 
       private dialogserve: DialogService,
       private modalController: ModalController,
      private activeRoute: ActivatedRoute, 
      private dialog: MatDialog,
      private dataService: DataService,
    
      ) {
       
       }

  ngOnInit() {
    this.getOrdersDetails();

  }
  
  public getOrdersDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/orders/${id}`;
 
    this.repository.getData(apiUrl)
    .subscribe((res) => {
      this.order = res as OrderDto;
    },
    (err: HttpErrorResponse) =>{
      this.errorMessage = err.message;
      this.showError = true;
    })
  }

  RecievedOrderUpdate(id: any) {
    this.dialogserve
      .openConfirmDialog('Did you deliver the order ?')
      .afterClosed()
      .subscribe(   (res) => {
        if (res) {
          const deleteUri: string = `api/orders/${id}`;
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

  public redirectToRating = (id: string) => {
    if (this.modalController) {
      this.modalController.dismiss();
    }
    let url: string = `/tabs/tab1/rating/${id}`;
    this.router.navigate([url]);
  }
}
