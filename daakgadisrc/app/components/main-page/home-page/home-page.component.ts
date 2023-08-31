import { Router, ActivatedRoute } from '@angular/router';
import { Cart } from './../../../_modals/cart.modal';
import { Wishlist } from './../../../_modals/wishlist.modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from "@angular/core";
import { LoaderService } from "src/app/loader/loader.service";
import { Products } from "src/app/_modals/product.modal";
import { ProductService } from "src/app/_services/product.service";
import { isEmpty } from 'rxjs';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  categories;
  user;
  currUserId;
  cart = [];
  products = [];
  wishlist = [];
  products2 = [];
  products3 = [];
  products4 = [];
  products5 = [];

  showSearchedProducts: Products[] = [];
  showSearchedProductBool: boolean = false;
  
  constructor(private productService: ProductService, public loaderService: LoaderService, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCategories();
    localStorage.removeItem('buyNowProd');
    if(localStorage.getItem('viaanMartUser')){
      if(!localStorage.getItem('count')){
        let count = 1;
        localStorage.setItem('count', JSON.stringify(count));
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./'], {
          relativeTo: this.route
        })
      }
      this.getCartItems();
      this.getWishlist();
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

  getProducts() {
    this.products = [];
    this.productService.getProducts().subscribe((res) => {
      for(let i=0;i<res.length;i++){

        if(i<5){
          this.products.push(res[i]);
        }else{
          if(i<10){
            this.products2.push(res[i]);
            
          }else{
            if(i<15){
              this.products3.push(res[i]);
            }else{
              if(i<20){
                this.products4.push(res[i]);
              }else{
                if(i<25){
                  this.products5.push(res[i]);
                }else{
        
                }
              }
            }
          }
        }
        
       

      }

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

  getWishlist(){
    this.productService.getWishlist().subscribe((res: Wishlist[])=>{
      console.log(res);
      this.wishlist = res.map(x => x.pid);
      console.log(this.wishlist);
    })
  }

  addToWishlist(pid){
    if(localStorage.getItem('viaanMartUser')){
      let data = { cid: this.user._id, pid: pid }
      this.productService.addToWishlist(data).subscribe(res=>{
        this.showNotification(
          'snackbar-success',
          `Added To Wishlist...!!!`,
          'bottom',
          'center'
        )
        this.getWishlist();
        this.productService.refreshWishlist.next(true);
      })
    }

    else if(localStorage.getItem('guest')){
      if(confirm("You need to Sign-up/Login First")){
        this.router.navigateByUrl('sign-in');
      }
    }
  }

  removeFromWishlist(pid){
    this.productService.getWishlist().subscribe((res: Wishlist[])=> {
      let product = res.find(x => x.pid === pid);
      let id = { id: product._id };
      this.productService.removeFromWishlist(id).subscribe(res=>{
        this.showNotification(
          'snackbar-danger',
          `Removed From Wishlist...!!!`,
          'bottom',
          'center'
        )
        this.getWishlist();
        this.productService.refreshWishlist.next(true);
      })
    })
  }

  getCategories(){
    this.productService.getCategories().subscribe(res=>{
      console.log(res);
      this.categories = res;
    })
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


// this.productService.addProductToCart(body).subscribe(res=>{
    //   console.log(res);
    //   if(localStorage.getItem(`cart_${this.user._id}`)){
    //     let cart = JSON.parse(localStorage.getItem(`cart_${this.user._id}`));
    //     cart = [...cart, { pid: id, qty: 1 }];
    //     console.log(cart);
    //     localStorage.setItem(`cart_${this.user._id}`, JSON.stringify(cart));
        
    //   }
    //   else{
    //     let cart = [{ pid: id, qty: 1 }];
    //     console.log(cart);
    //     localStorage.setItem(`cart_${this.user._id}`, JSON.stringify(cart));
    //   }
    //   this.productService.refreshCart.next(true);
    // }, err=>{
    //   if(err.error.text === 'Already Added'){
    //     alert('Item is already added in the cart, Please Review the cart to update the Quantity');
    //   }
    // })