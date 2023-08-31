import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Products } from "../_modals/product.modal";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: Subject<Products[]> = new Subject<Products[]>();
  getCurrLocation: Subject<string> = new Subject<string>();
  refreshCart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  refreshCartAfterPlace: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  refreshCategories: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  refreshWishlist: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  sendKeywordOfSearch: Subject<string> = new Subject<string>();
  sendKeywordOfFeaturedSearch: Subject<string> = new Subject<string>();

  currUser;

  product;

  constructor(private http: HttpClient) {
    this.currUser = JSON.parse(localStorage.getItem("viaanMartUser"));
  }

  sendBuyNowProd(prod){
    this.product = prod;
  }

  getProduct(){
    return this.product;
  }

  getProducts() {
    return this.http.get<Products[]>(
      "https://vakeemagro.el.r.appspot.com/api/products/getproducts"
    );
  }

  getProductsByCategory(productcat: string) {
    return this.http.get(
      "https://vakeemagro.el.r.appspot.com/api/products/getcategory?category=${productcat}"
    );
  }

  addImage(image): Observable<{}> {
    const formData = new FormData();
    formData.append("file", image);

    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/upload/addfiles",
      formData
    );
  }

  getCartItems(id) {
    return this.http.post<[]>(
      "https://vakeemagro.el.r.appspot.com/api/users/getcartlist",
      id
    );
  }

  addProductToCart(body) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/cart/addtocart",
      body
    );
  }

  updateProductQuantityInCart(id, body){
    return this.http.post(`https://vakeemagro.el.r.appspot.com/api/cart/updatequantity?id=${id}`, body);
  }

  updateProductQuantity(id, body){
    return this.http.post(`https://vakeemagro.el.r.appspot.com/api/products/updatequantity?id=${id}`, body);
  }

  removeProductFromCart(id){
    return this.http.post("https://vakeemagro.el.r.appspot.com/api/cart/deletecartitem", id);
  }

  placeOrder(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/orders/placeorder",
      data
    );
  }

  sendPayment(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/payments/add",
      data
    );
  }

  getofferBanners() {
    return this.http.get<[]>(
      "https://vakeemagro.el.r.appspot.com/api/images/getbanners"
    );
  }

  getCategories() {
    return this.http.get<[]>(
      "https://vakeemagro.el.r.appspot.com/api/category/getcategories"
    );
  }

  addToWishlist(data){
    return this.http.post("https://vakeemagro.el.r.appspot.com/api/wishlist/addtowishlist", data);
  }

  getWishlist(){
    return this.http.get<[]>(`https://vakeemagro.el.r.appspot.com/api/wishlist/getwishlist?id=${this.currUser._id}`);
  }

  removeFromWishlist(data){
    return this.http.post("https://vakeemagro.el.r.appspot.com/api/wishlist/deletewishlistitem", data);
  }

  getCart(){
    return this.http.get<[]>(`https://vakeemagro.el.r.appspot.com/api/cart/getcart?id=${this.currUser._id}`);
  }
}
