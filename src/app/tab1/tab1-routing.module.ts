import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { ItemDetailsPage } from './item-details/item-details.page';
import { RatingPage } from './rating/rating.page';
import { BookPage } from './book/book.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'item/:id',
    component:  ItemDetailsPage
  },
  {
    path: 'rating/:id',
    component:  RatingPage
  },
  {
    path: 'book/:id',
    component:  BookPage
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
