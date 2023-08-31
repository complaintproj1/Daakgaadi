import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FooterComponent } from './footer/footer.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { OfferComponent } from './offer/offer.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { RouterModule } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ShareComponent } from './share/share.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SubscriptionComponent } from '../main-page/subscription/subscription.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { SubscriptiondialogComponent } from './subscriptiondialog/subscriptiondialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { PartloadComponent } from './partload/partload.component';
import { ParcelComponent } from './parcel/parcel.component';
import { TruckloadComponent } from './truckload/truckload.component';
import { PackerComponent } from './packer/packer.component';
import { BiketransComponent } from './biketrans/biketrans.component';
import { CartransComponent } from './cartrans/cartrans.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { TrackComponent } from './track/track.component';
import { BookComponent } from './track/book/book.component';
import { BookpackerComponent } from './packer/bookpacker/bookpacker.component';
import { ConfirmformComponent } from './confirmform/confirmform.component';

@NgModule({
  declarations: [
    MainPageComponent,
    NavbarComponent,
    HomePageComponent,
    FooterComponent,
    SubscriptionComponent,
    NewProductsComponent,
 
    SingleProductComponent,
    FeaturedProductsComponent,
    OfferComponent,
    TermsConditionComponent,
    OrderPlacedComponent,
    CheckoutComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    ShareComponent,
    SubscriptiondialogComponent,
    PartloadComponent,
    ParcelComponent,
    TruckloadComponent,
    PackerComponent,
    BiketransComponent,
    CartransComponent,
    WarehouseComponent,
    TrackComponent,
    BookComponent,
    BookpackerComponent,
    ConfirmformComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatButtonModule,
    YouTubePlayerModule,
    MatGridListModule, 
    MatIconModule,
    IvyCarouselModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatBottomSheetModule,
    ClipboardModule,
    MatSlideToggleModule
  ],
})
export class MainPageModule {}
