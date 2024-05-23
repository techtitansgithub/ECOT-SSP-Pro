import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { OrdersPage } from './orders/orders.page';
import { OrderDetailsPage } from './order-details/order-details.page';
import { NotificationsPage } from './notifications/notifications.page';
import { BookingsPage } from './bookings/bookings.page';
import { BookingUpdatePage } from './booking-update/booking-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    ExploreContainerComponentModule,
    ReactiveFormsModule,
  ],
  exports:[],
  declarations: [Tab4Page,OrdersPage,OrderDetailsPage,NotificationsPage,BookingsPage,
    BookingUpdatePage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab4PageModule {}
