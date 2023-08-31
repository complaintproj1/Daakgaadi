import { Wishlist } from './../../../_modals/wishlist.modal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { ProductService } from 'src/app/_services/product.service';
import { Cart } from 'src/app/_modals/cart.modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currRoute: string = "";
  currUser;
  currLocation: string = "";
  currUserId;
  products = [];
  grandTotal = 0;
  totalSavings = 0;
  categories;

  cartItems = [];
  wishlistItems;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public loaderService: LoaderService
  ) {
    this.productService.getCurrLocation.subscribe((res) => {
      this.currLocation = res;
    });
    this.productService.refreshCartAfterPlace.subscribe(res=>{
      if(res === true){
        this.getCart();
      }
    })
    this.productService.refreshWishlist.subscribe(res=>{
      if(res === true){
        this.getWishListCount();
      }
    })
    this.productService.refreshCart.subscribe(res=>{
      if(res === true){
        this.getCart();
      }
    })
  }

  ngOnInit(): void {
    this.getCurrentRoute();
    this.getCurrentUser();
    this.getProducts();
    this.getCategories();
    this.watchPosition();
    this.getWishListCount();
    this.getCart();
  }

  refreshCategories(){
    this.productService.refreshCategories.next(true);
  }

  getCurrentUser(){
    this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
  }

  getWishListCount(){
    this.productService.getWishlist().subscribe((res: Wishlist[])=>{
      this.wishlistItems = res.length;
    })
  }
  
  getCurrentRoute() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currRoute = (<NavigationEnd>event).url.split("/", 3)[2];
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  increaseQty(id){
    console.log(id);
    this.productService.getCart().subscribe((res:Cart[])=>{
      let cart: Cart[] = res.filter((p)=> p.pid === id);
      console.log(cart[0]);
      let body = { quantity: cart[0].quantity + 1 };
      this.productService.updateProductQuantityInCart(cart[0]._id, body).subscribe(res=>{
        console.log(res);
        this.getCart();
      })
    })
  }

  decreaseQty(id){
    console.log(id);
    this.productService.getCart().subscribe((res:Cart[])=>{
      let cart: Cart[] = res.filter((p)=> p.pid === id);
      let body = {}
      console.log(cart[0]);
      if(cart[0].quantity === 1){
        console.log(cart[0]);
        id = { id: cart[0]._id };
        this.productService.removeProductFromCart(id).subscribe(res=>{
          console.log(res);
          this.getCart();
        })
      }
      else if(cart[0].quantity > 1){
        body = { quantity: cart[0].quantity - 1 };
        this.productService.updateProductQuantityInCart(cart[0]._id, body).subscribe(res=>{
          console.log(res);
          this.getCart();
        })
      }
    })
  }

  getCart(){
    this.productService.getCart().subscribe(res=>{
      this.cartItems = [];
      this.grandTotal = 0;
      this.totalSavings = 0;
      res.forEach((item: Cart) =>{
        this.products.forEach(prod=>{
          if(prod._id === item.pid){
            console.log(prod);
            prod.qty = item.quantity;
            prod.saving = prod.qty * (prod.aprice - prod.dprice);
            prod.total = prod.qty * prod.dprice; 
            this.cartItems.push(prod);
          }
        })
      })
      console.log(this.cartItems);
      this.cartItems.forEach(prod=>{
        this.grandTotal = this.grandTotal + prod.total;
        this.totalSavings = this.totalSavings + prod.saving;
      })
    })
  }

  watchPosition() {
    if (!navigator.geolocation) {
      console.log("Location is not supported");
    } else {
      navigator.geolocation.watchPosition(
        (position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          let key = "AIzaSyBu2Os5atVa3rGvZSe1wS3K2ia1EOZx9zs";
          let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`;
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              let temp = data.results[0].formatted_address;
              this.currLocation = temp.split(",")[3];
              // this.productService.getCurrLocation.next(currLocation);
            });
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    }
  }

  logOut(){
    localStorage.removeItem('viaanMartUser');
    this.router.navigateByUrl('/');
  }

  getCategories(){
    this.productService.getCategories().subscribe(res=>{
      console.log(res);
      this.categories = res;
    })
  }

  refresh(id){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`/main-page/featured-products/${id}`])
    // window.onload(`/main-page/featured-products/${id}`)
    // this.route.(`/main-page/featured-products/${id}`);
  }
}
