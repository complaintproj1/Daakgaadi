import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoaderService } from "src/app/loader/loader.service";
import { Cart } from "src/app/_modals/cart.modal";
import { Products } from "src/app/_modals/product.modal";
import { ProductService } from "src/app/_services/product.service";

@Component({
  selector: "app-new-products",
  templateUrl: "./new-products.component.html",
  styleUrls: ["./new-products.component.css"],
})
export class NewProductsComponent implements OnInit {
  products: Products[] = [];
  cart = [];
  qty = [];
  prod = [];
  currUserId;
  user;

  showSearchedProducts: Products[] = [];
  showSearchedProductBool: boolean = false;

  keywordOfSearch;

  totalProducts = [];

  constructor(public productService: ProductService, public loaderService: LoaderService,private snackbar: MatSnackBar, private router: Router) {
    productService.sendKeywordOfSearch.subscribe(res=>{
      this.keywordOfSearch = res;
      this.searchProducts(this.keywordOfSearch);
    })
  }

  searchProducts(value){
    if(value !== ''){
      this.showSearchedProductBool = true;
      this.showSearchedProducts = this.products.filter(x => x.pname.toLowerCase().includes(value));
    }
    else{
      this.showSearchedProductBool = false;
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('buyNowProd');
    if(localStorage.getItem('viaanMartUser')){
      this.getCartItems();
    }
    else{
      this.getProducts();
    }
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
    this.products = [];
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.products.forEach(prod=>{
        prod.qty = 0;
      })
      if(localStorage.getItem('viaanMartUser')){
        this.cart.forEach(item=>{
          this.products.forEach(prod=>{
            if(prod._id === item.pid){
              prod.qty = item.quantity;
            }
          })
        })
      }
      
      console.log(this.products);
    });
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
