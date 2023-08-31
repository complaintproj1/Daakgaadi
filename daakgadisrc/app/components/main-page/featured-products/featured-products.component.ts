import { Category } from './../../../_modals/category.modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/_modals/cart.modal';
import { Products } from 'src/app/_modals/product.modal';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {
  category;
  products: Products[] = [];
  currUser;
  cart = [];
  subcat;
  subcategory;
  keywordOfSearch;

  showSearchedProducts: Products[] = [];
  showSearchedProductBool: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, private snackbar: MatSnackBar, private router: Router
    ) {
      productService.sendKeywordOfFeaturedSearch.subscribe(res=>{
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

  getCurrentUser(){
    if(localStorage.getItem('viaanMartUser')){
      this.currUser = JSON.parse(localStorage.getItem('viaanMartUser'));
    }
    else{
      this.currUser = JSON.parse(localStorage.getItem('guest'));
    }
  }

  ngOnInit(): void {
    this.getCurrentUser();
    localStorage.removeItem('buyNowProd');
    if(localStorage.getItem('viaanMartUser')){
      this.getCartItems();
    }
    else{
      this.getProducts();
    }
  }

  getCartItems(){
    this.productService.getCart().subscribe(res=>{
      this.cart = res;
      console.log(res);
      this.getProducts();
    })
  }

  getProducts() {
    this.products = [];
    const currRoute = this.route.snapshot.params["id"];
    this.productService.getProducts().subscribe((response) => {
      response.forEach(prod => {
        prod.qty = 0;
      })
      this.productService.getCategories().subscribe((res: Category[]) =>{
        console.log(res);
        console.log(currRoute);
        
        res.forEach(category=>{
          category.subcategories.forEach(sub=>{
            if(sub.sid === currRoute){
              this.subcategory = sub;
            }
          })
        })
        console.log(this.subcategory);
        
        this.products = response.filter((p) => p.pcat === currRoute);
        this.subcat = this.subcategory.name;
        console.log(this.products);
        this.cart.forEach(item=>{
          this.products.forEach(prod=>{
            if(prod._id === item.pid){
              prod.qty = item.quantity;
            }
          })
        })
      })
    });
  }

  addProduct(id){
    if(localStorage.getItem('viaanMartUser')){
      console.log(id);
      let cart: Cart[] = this.cart.filter((p)=> p.pid === id);
      let body = {}
      
      if(cart.length === 0){
        body = { pid: id, cid: this.currUser._id, quantity: 1 };
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

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
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


}
