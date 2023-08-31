import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyRewardsComponent } from './my-rewards/my-rewards.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { OverviewComponent } from './overview/overview.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyParcelComponent } from './my-parcel/my-parcel.component';
import { MyTruckComponent } from './my-truck/my-truck.component';
import { MyPackersComponent } from './my-packers/my-packers.component';
import { MyBikeComponent } from './my-bike/my-bike.component';
import { MyCarComponent } from './my-car/my-car.component';
import { MyWarehouseComponent } from './my-warehouse/my-warehouse.component';
import { MyInvoiceComponent } from './my-invoice/my-invoice.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-orders',
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
  },
  {
    path: 'my-parcel',
    component: MyParcelComponent,
  },
  {
    path: 'my-truck',
    component: MyTruckComponent,
  },
  {
    path: 'my-packer',
    component: MyPackersComponent,
  },
  {
    path: 'my-bike',
    component: MyBikeComponent,
  },
  {
    path: 'my-car',
    component: MyCarComponent,
  },
  {
    path: 'my-warehouse',
    component: MyWarehouseComponent,
  },
  {
    path: 'my-invoice',
    component: MyInvoiceComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
