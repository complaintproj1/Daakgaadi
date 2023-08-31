import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "src/app/_services/product.service";
import { Products } from "src/app/_modals/product.modal";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cart } from "src/app/_modals/cart.modal";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ShareComponent } from "../share/share.component";

@Component({
  selector: "app-single-product",
  templateUrl: "./single-product.component.html",
  styleUrls: ["./single-product.component.css"],
})
export class SingleProductComponent implements OnInit, OnDestroy {
  currRoute;
  product: Products;
  allProducts: Products[] = [];
  subscription: Subscription;
  currUser;
  cartItems = [];
  user;
  currUserId;
  cart;
  relatedProducts: Products[] = [];
  refreshPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentRoute;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private snackbar: MatSnackBar,
    private _bottomSheet: MatBottomSheet,
  ) {
    this.refreshPage.subscribe(res=>{
      if(res === true){
        this.getCartItems();
        this.getRelatedProducts();
        this.refreshPage.next(false);
      }
    })

  }

  ngOnInit(): void {
    localStorage.removeItem('buyNowProd');
    if(localStorage.getItem('viaanMartUser')){
      this.getCartItems();
    }
    else{
      this.getProducts();
    } 
    this.getRelatedProducts();
  }

  openBottomSheet(){
    let data = this.route.snapshot.url;
    let route = 'https://play.google.com/store/apps/details?id=com.vakeem.vakeemagro' ;
    console.log(route);
    this._bottomSheet.open(ShareComponent, {
      data: {prod:this.product, url: route}
    });    
  }

  refresh(){
    this.refreshPage.next(true);
  }

  getCartItems(){
    this.user = JSON.parse(localStorage.getItem('viaanMartUser'));
    this.productService.getCart().subscribe(res=>{
      this.cart = res;
      console.log(res);
      this.getProducts();
    })
  }

  getProducts() {
    this.currRoute = this.route.snapshot.params["id"];
    this.productService.getProducts().subscribe((res) => {
      let prod = res.filter((p) => p._id === this.currRoute);
      this.product = prod[0];
      this.product.qty = 0;
      this.cart?.forEach(item=>{
        if(this.product._id === item.pid){
          this.product.qty = item.quantity;
        }
      })
      console.log(this.product);
    });
  }

  increaseQty(id){
    console.log(id);
    let cart: Cart[] = this.cart.filter((p)=> p.pid === id);
    let body = {}
    console.log(cart[0]);
    body = { quantity: cart[0].quantity + 1 };
    this.productService.updateProductQuantityInCart(cart[0]._id, body).subscribe(res=>{
      console.log(res);
      this.showNotification(
        'snackbar',
        `Quntity Updated...!!!`,
        'bottom',
        'center'
      )
      this.getCartItems();
      this.productService.refreshCartAfterPlace.next(true);
    })
  }

  decreaseQty(id){
    console.log(id);
    let cart: Cart[] = this.cart.filter((p)=> p.pid === id);
    let body = {}
    console.log(cart[0]);
    if(cart[0].quantity === 1){
      console.log(cart[0]);
      id = { id: cart[0]._id };
      this.productService.removeProductFromCart(id).subscribe(res=>{
        console.log(res);
        this.showNotification(
          'snackbar-danger',
          `Item Removed from Cart...!!!`,
          'bottom',
          'center'
        )
        this.getCartItems();
        this.productService.refreshCartAfterPlace.next(true);
      })
    }
    else if(cart[0].quantity > 1){
      body = { quantity: cart[0].quantity - 1 };
      this.productService.updateProductQuantityInCart(cart[0]._id, body).subscribe(res=>{
        console.log(res);
        this.showNotification(
          'snackbar',
          `Quntity Updated...!!!`,
          'bottom',
          'center'
        )
        this.getCartItems();
      })
    }
  }


  addProduct(id){

    if(localStorage.getItem('viaanMartUser')){
      console.log(id);
      let cart: Cart[] = this.cart.filter((p)=> p.pid === id);
      let body = {}
      
      if(cart.length === 0){
        body = { pid: id, cid: this.user._id, quantity: 1 };
        this.productService.addProductToCart(body).subscribe(res=>{
          console.log(res);
          this.showNotification(
            'snackbar-success',
            `Product Added to Cart...!!!`,
            'bottom',
            'center'
          )
          this.getCartItems();
          this.productService.refreshCartAfterPlace.next(true);
        })
      }
    }
    else if(localStorage.getItem('guest')){
      if(confirm('You need to Sign-up/Login First')){
        this.router.navigateByUrl('sign-in')
      }
    }
  }

  buyNow(prod){
    if(localStorage.getItem('viaanMartUser')){
      console.log(prod);
      localStorage.setItem('buyNowProd', JSON.stringify(prod));
      this.router.navigateByUrl('/main-page/checkout');
    }
    else if(localStorage.getItem('guest')){
      if(confirm('You need to Sign-up/Login First')){
        this.router.navigateByUrl('sign-in')
      }
    }
  }

  getRelatedProducts(){
    this.productService.getProducts().subscribe((res) => {
      let prod = res.filter((p) => p._id === this.currRoute);
      let category = prod[0].pcat;
      this.productService.getProducts().subscribe(res=>{
        this.relatedProducts = res.filter((p) => p.pcat === category);
        this.relatedProducts = this.relatedProducts.filter((a) => a._id !== this.currRoute)
        console.log(this.relatedProducts);
      })
    });
  }

  getCurrentProduct() {
    this.productService.getProducts().subscribe((res) => {
      let prod = res.filter((p) => p._id === this.currRoute);
      this.product = prod[0];
      console.log(this.product);
    });
  }

  ngOnDestroy(): void {
    //   this.subscription.unsubscribe();
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
