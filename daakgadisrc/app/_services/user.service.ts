import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { Order } from "../_modals/order.modal";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currUser;

  constructor(private http: HttpClient) {
    this.currUser = JSON.parse(localStorage.getItem("viaanMartUser"));
  }

  

  updatePointsBalance(id, body){
    return this.http.post(`https://vakeemagro.el.r.appspot.com/api/users/additional?id=${id}`, body);
  }

  getAllUsers(){
    return this.http.get<[]>(`https://vakeemagro.el.r.appspot.com/api/users/getUsers`);
  }

  getUserOrder(url) {
    return this.http.get<Order[]>(
      `https://vakeemagro.el.r.appspot.com/api/orders/details?id=${url}`
    ).pipe(take(1));
  }

  updatePhoneNumber(data) {
    return this.http.post(
      "https://vakeemagro.el.r.appspot.com/api/users/updatephone",
      data
    );
  }

  getUserProfile() {
    return this.http.get(
      `https://vakeemagro.el.r.appspot.com/api/users/getprofile?id=${this.currUser._id}`
    );
  }

  getUserAllOrders() {
    console.log(this.currUser.phone);

    return this.http.get<[]>(
      `https://trekkowave.el.r.appspot.com/api/userestim/${this.currUser.phone}`
    );
  }

  getUserCar() {
    console.log(this.currUser.phone);

    return this.http.get<[]>(
      `https://trekkowave.el.r.appspot.com/api/usercar/${this.currUser.phone}`
    );
  }


  getWarehouse() {
    console.log(this.currUser.phone);

    return this.http.get<[]>(
      `https://trekkowave.el.r.appspot.com/api/userwarehouse/${this.currUser.phone}`
    );
  }


  getUserBike() {
    console.log(this.currUser.phone);

    return this.http.get<[]>(
      `https://trekkowave.el.r.appspot.com/api/userestim/${this.currUser.phone}`
    );
  }

  getUserParcel() {
    console.log(this.currUser.phone);

    return this.http.get<[]>(
      `https://trekkowave.el.r.appspot.com/api/userparcel/${this.currUser.phone}`
    );
  }

  getUserTruck() {
    console.log(this.currUser.phone);

    return this.http.get<[]>(
      `https://trekkowave.el.r.appspot.com/api/usertruck/${this.currUser.phone}`
    );
  }

  getroute() {
    return this.http.get("https://trekkowave.el.r.appspot.com/api/getroutes");

  }


  getUserPacker() {
    console.log(this.currUser.phone);

    return this.http.get<[]>(
      `https://trekkowave.el.r.appspot.com/api/userpacker/${this.currUser.phone}`
    );
  }


  addAddress(data,id) {
    return this.http.post(
      `https://vakeemagro.el.r.appspot.com/api/users/addaddress?id=${id}`,
      data
    );
  }

  clearCart() {
    return this.http.post(
      `https://vakeemagro.el.r.appspot.com/api/cart/deleteallcartitem?id=${this.currUser._id}`, 'any');
  }

  getDeliveryList(){
    return this.http.get<[]>("https://vakeemagro.el.r.appspot.com/api/delivery/getlist");
  }
}
