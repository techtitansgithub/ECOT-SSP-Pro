import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';
import { OrdersPage } from './orders/orders.page';
import { OrderDetailsPage } from './order-details/order-details.page';
import { NotificationsPage } from './notifications/notifications.page';
import { BookingsPage } from './bookings/bookings.page';
import { BookingUpdatePage } from './booking-update/booking-update.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  },
  {
    path: 'orders',
    component: OrdersPage
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsPage
  },
  {
    path: 'notifications',
    component: NotificationsPage
  },
  {
    path: 'bookings',
   component: BookingsPage
  },
  {
    path: 'confirm-booking/:id',
   component: BookingUpdatePage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
