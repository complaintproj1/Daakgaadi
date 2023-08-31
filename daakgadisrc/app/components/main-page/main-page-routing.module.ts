import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { OfferComponent } from './offer/offer.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {  SubscriptionComponent } from './subscription/subscription.component';
import { PartloadComponent } from './partload/partload.component';
import { ParcelComponent } from './parcel/parcel.component';
import { TrackComponent } from './track/track.component';
import { PackerComponent } from './packer/packer.component';
import { BiketransComponent } from './biketrans/biketrans.component';
import { CartransComponent } from './cartrans/cartrans.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-page',
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'new-products',
    component: NewProductsComponent,
  },
  {
    path: 'featured-products/:id',
    component: FeaturedProductsComponent,
  },
  {
    path: 'single-product/:id',
    component: SingleProductComponent,
  },
  {
    path: 'offers',
    component: OfferComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'terms-&-condition',
    component: TermsConditionComponent,
  },
  {
    path: 'order-placed',
    component: OrderPlacedComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
  },
  {
    path: 'partload',
    component: PartloadComponent,
  },
  {
    path: 'parcel',
    component: ParcelComponent,
  },
  {
    path: 'fullload',
    component: TrackComponent,
  },
  {
    path: 'packer',
    component: PackerComponent,
  },
  {
    path: 'bike',
    component: BiketransComponent,
  },
  {
    path: 'car',
    component: CartransComponent,
  },
  {
    path: 'warehouse',
    component: WarehouseComponent,
  },
  {
    path: 'tracker',
    component: TrackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
