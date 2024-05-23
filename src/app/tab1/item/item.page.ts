import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductDto } from 'src/app/models/product';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {

  @Input() product!: ProductDto;
  constructor(    private router: Router,private modalController: ModalController) { }

  public redirectToDetails = async (id: string) => {
    if (this.modalController) {
      const topModal = await this.modalController.getTop();
      if (topModal) {
        this.modalController.dismiss();
      }
    }
    let url: string = `/tabs/tab1/item/${id}`;
    this.router.navigate([url]);
  }

}
