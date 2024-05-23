import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ItemPage } from './item/item.page';
import { MaterialModule } from '../Shared/material.module';
import { ItemDetailsPage } from './item-details/item-details.page';
import { StarRatingPage } from './star-rating/star-rating.page';
import { RatingPage } from './rating/rating.page';
import { BookPage } from './book/book.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  declarations: [Tab1Page,ItemPage,ItemDetailsPage,StarRatingPage,RatingPage,BookPage]
})
export class Tab1PageModule {}
