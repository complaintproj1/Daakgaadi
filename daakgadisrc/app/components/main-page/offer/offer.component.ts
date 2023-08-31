import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  offerBanners = []

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.getOfferBanners();
    localStorage.removeItem('buyNowProd');
  }

  getOfferBanners(){
    this.productService.getofferBanners().subscribe(res=>{
      this.offerBanners = res;
      console.log(this.offerBanners);
      
    })
  }

}
