import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OverviewComponent } from './overview/overview.component';
import { MyRewardsComponent } from './my-rewards/my-rewards.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { AddAddressComponent } from './my-addresses/add-address/add-address.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { InvoiceComponent } from './my-orders/invoice/invoice.component';
import { MyParcelComponent } from './my-parcel/my-parcel.component';
import { MyTruckComponent } from './my-truck/my-truck.component';
import { MyPackersComponent } from './my-packers/my-packers.component';
import { MyBikeComponent } from './my-bike/my-bike.component';
import { MyCarComponent } from './my-car/my-car.component';
import { MyWarehouseComponent } from './my-warehouse/my-warehouse.component';
import { MyInvoiceComponent } from './my-invoice/my-invoice.component';
import { CarinvoiceComponent } from './my-car/carinvoice/carinvoice.component';
import { BikeinvoiceComponent } from './my-bike/bikeinvoice/bikeinvoice.component';
import { PackerinvoiceComponent } from './my-packers/packerinvoice/packerinvoice.component';
import { ParcelinvoiceComponent } from './my-parcel/parcelinvoice/parcelinvoice.component';
import { TruckinvoiceComponent } from './my-truck/truckinvoice/truckinvoice.component';
import { WarehouseinvoiceComponent } from './my-warehouse/warehouseinvoice/warehouseinvoice.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    NavbarComponent,
    WishlistComponent,
    FooterComponent,
    MyOrdersComponent,
    OverviewComponent,
    MyRewardsComponent,
    MyWalletComponent,
    MyAddressesComponent,
    AddAddressComponent,
    InvoiceComponent,
    MyParcelComponent,
    MyTruckComponent,
    MyPackersComponent,
    MyBikeComponent,
    MyCarComponent,
    MyWarehouseComponent,
    MyInvoiceComponent,
    CarinvoiceComponent,
    BikeinvoiceComponent,
    PackerinvoiceComponent,
    ParcelinvoiceComponent,
    TruckinvoiceComponent,
    WarehouseinvoiceComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    MatMenuModule,
    ClipboardModule,
    MatProgressBarModule
  ],
})
export class UserDashboardModule {}
