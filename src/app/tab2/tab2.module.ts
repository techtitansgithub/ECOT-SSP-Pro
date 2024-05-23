import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { UpdatePage } from './update/update.page';
import { MaterialModule } from '../Shared/material.module';
import { UploadComponent } from '../Shared/upload/upload.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from '../Shared/modals/modals.module';
import { AddProductPage } from './add-product/add-product.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule
  ],
  declarations: [Tab2Page,AddProductPage,UpdatePage,UploadComponent]
})
export class Tab2PageModule {}
