export class User {
  _id: number;
  address: [];
  balance: number;
  cart: [];
  coupon: string;
  currentaddress: {};
  email: string;
  name: string;
  password: string;
  phone: string;
  wishlist: [];

  constructor(user) {
    this._id = user._id;
    this.address = user.address;
    this.balance = user.balance;
    this.cart = user.cart;
    this.coupon = user.coupon;
    this.currentaddress = user.currentaddress;
    this.email = user.email;
    this.name = user.name;
    this.wishlist = user.wishlist;
    this.password = user.password;
    this.phone = user.phone;
  }
}
