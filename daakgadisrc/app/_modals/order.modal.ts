export class Order {
  _id: string;
  odate: string;
  oprice: string;
  ono: string;
  edate: string;
  oproduct: string;
  oaddress: {};
  ostatus: string;
  uid: string;
  ocart: [];
  rpayid: string;

  constructor(product) {
    this._id = product._id;
    this.odate = product.odate;
    this.edate = product.edate;
    this.oprice = product.oprice;
    this.ono = product.ono;
    this.oproduct = product.oproduct;
    this.oaddress = product.oaddress;
    this.ostatus = product.pname;
    this.uid = product.uid;
    this.ocart = product.ocart || [];
    this.rpayid = product.rpayid;
  }
}
