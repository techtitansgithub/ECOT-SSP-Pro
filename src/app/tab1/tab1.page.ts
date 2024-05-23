
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import {  HubConnection, HubConnectionBuilder} from '@microsoft/signalr';
import { MessageService } from '../Shared/message.service';
import { UserService } from '../Shared/user.service';
import { ModalController } from '@ionic/angular';
import { ProductDto, CategoryDto, ShopParams } from '../models/product';
import { FormControl } from '@angular/forms';
import { ShopService } from '../Shared/shop.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RepositoryService } from '../Shared/repository.service';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from '../Shared/data.service';
import { Subscription } from 'rxjs';


interface Sorting {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public product!:ProductDto[];
  public categories!:CategoryDto[];
  showSuccess!: boolean;
  showError!: boolean;
  errorMessage!: string;
  shopParams = new ShopParams();
  sortOrderControl = new FormControl('');
  searchKey = new FormControl('');
  minPriceControl = new FormControl('');
  maxPriceControl = new FormControl('');
pagedata: any;
  TotalCount!: number;
  pageIndex = 0;
  pageSize = 6;
  showFirstLastButtons = true;
  hidePageSize = true;
  showPageSizeOptions = false;
  private refreshSubscription!: Subscription;
 
  Sorting: Sorting[] = [
    { value: '1', viewValue: 'R 5 000' },
    { value: '2', viewValue: 'R 10 000' },
    { value: '3', viewValue: 'R 15 000' },
  ];

  selectedCategory: any;

  constructor(private shopService: ShopService,  public router: Router,
    private repoService: RepositoryService,    private dataService: DataService,) { 
      this.refreshSubscription = this.dataService.refreshTab1$.subscribe(() => {
        this.getAllProduct(this.pageIndex, this.pageSize);
      });
    }


  ngOnInit(): void {
    this.getAllProduct(this.pageIndex, this.pageSize);
    this.sortOrderControl.valueChanges.subscribe((value) => {
     if (value) {
       this.pageIndex = 0;
       this.pageSize = 6;
       this.getAllProduct(this.pageIndex,
       this.pageSize);
     }
   });
   this.minPriceControl.valueChanges.subscribe((value) => {
     if (value) {
       this.onMinSelected(value);
       this.getAllProduct(this.pageIndex,
       this.pageSize);
     }
   });
   this.maxPriceControl.valueChanges.subscribe((value) => {
     if (value) {
       this.onMaxSelected(value);
       this.getAllProduct(this.pageIndex,
       this.pageSize);
     }
   });
   
   
   this.getAllCategories();
      
}


  getAllProduct(currentPage:number, pageSize:number){
    this.shopService.getProduct(this.shopParams, (currentPage + 1), pageSize).subscribe(response => {
      this.product = response.body as ProductDto[];
      this.pagedata = response.headers.get('X-Pagination');
      this.pagedata = JSON.parse(this.pagedata);
      this.TotalCount= this.pagedata["TotalCount"];
      console.log(this.TotalCount);

    
    }),
    (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }
  }

  public getAllCategories = () => {
    this.repoService.getData('api/categories').subscribe(res => {
      this.categories = res as CategoryDto[];
     
    }),
    (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }
  }


handlePageEvent(e: PageEvent) {
  this.pageIndex = e.pageIndex ;
  this.pageSize = e.pageSize;
  this.getAllProduct(this.pageIndex,this.pageSize);
}

onMinSelected(value: string) {
  let minPrice: number = 0;
  if (value === '1') {
    this.shopParams.minPrice = 100;
  } else if (value.toLowerCase() === '2') {
    this.shopParams.minPrice = 500;
  } 
  else if (value.toLowerCase() === '3') {
    this.shopParams.minPrice = 1000;
  } 

  return {
    minPrice
  };
}

onMaxSelected(value: string) {
  let maxPrice: number = 0;
  if (value.toLowerCase()=== '1') {
    this.shopParams.maxPrice = 1000;
  } else if (value.toLowerCase() === '2') {
    this.shopParams.maxPrice = 2000;
  } 
  else if (value.toLowerCase() === '3') {
    this.shopParams.maxPrice = 5000;
  } 
  return {
    maxPrice
  };
}

onCategorySelected(category: number) {
  this.shopParams.category = category;
  this.getAllProduct(this.pageIndex,this.pageSize);
}

onReset() {
  window.location.reload();
}

}