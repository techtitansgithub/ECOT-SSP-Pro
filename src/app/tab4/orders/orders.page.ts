import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Shared/data.service';
import { RepositoryService } from 'src/app/Shared/repository.service';
import { OrderDto, ProductDto } from 'src/app/models/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
orders:OrderDto[] |any;
allOrders:OrderDto[] |any;
order:OrderDto |any;
public errorMessage: string = '';
public showError?: boolean;
loggedInUser = JSON.parse(localStorage.getItem("login-user")!)
private refreshSubscription!: Subscription;
  constructor(
    private repository: RepositoryService,
     private router: Router, 
     private modalController: ModalController,
    private activeRoute: ActivatedRoute, 
    private dialog: MatDialog,
    private dataService: DataService,
  
    ) {
      this.refreshSubscription = this.dataService.refreshTab1$.subscribe(() => {
        this.getOrders();
      });
     }

  ngOnInit() {
    this.getOrders();
    this.getAllOrders();
  }

  private getOrders = () =>{
    let apiUrl: string = `api/orders/${this.loggedInUser.firstName}/${this.loggedInUser.lastName}/PendingOrderByName`;
 
    this.repository.getData(apiUrl)
    .subscribe((res) => {
      this.orders = res as OrderDto[];
    },
    (err: HttpErrorResponse) =>{
      this.errorMessage = err.message;
      this.showError = true;
    })
  }

  private getAllOrders = () =>{
    let apiUrl: string = `api/orders/AllOrders/${this.loggedInUser.firstName}/OrderByName/${this.loggedInUser.lastName}`;
 
    this.repository.getData(apiUrl)
    .subscribe((res) => {
      this.allOrders = res as OrderDto[];
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
}
